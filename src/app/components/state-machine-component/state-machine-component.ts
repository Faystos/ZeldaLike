import { Math } from 'phaser';
import { StateMachine } from './types';

export class StateMachineComponent {
  #id: string;
  #states: Map<string, StateMachine> = new Map();
  #currentState: StateMachine | undefined = undefined;
  #isChangingState: boolean = false;
  readonly #changingStateQueue: { state: string; args: unknown[] }[] = [];

  constructor(id?: string) {
    this.#id = this.#getInitialId(id);
  }

  update(): void {
    const queueState = this.#changingStateQueue.shift();

    if (queueState !== undefined) {
      this.setState(queueState.state, queueState.args);
      return;
    }
    
    if (this.#currentState && this.#currentState.onUpdate) {
      this.#currentState.onUpdate();
    }
  }

  setState(name: string, ...args: unknown[]): void {
    const methodName = 'setState';
    if (!this.#states.has(name)) {
      console.warn(`[${StateMachineComponent.name}-${this.#id}:${methodName}] tried to change to unknown state ${name}`);
      return;
    }

    if (this.#isCurrentState(name)) {
      return;
    }

    if (this.#isChangingState) {
      this.#changingStateQueue.push({ state: name, args });
      return;
    }

    this.#isChangingState = true;
    this.#logInput(methodName, `change from ${ this.#currentState?.name } to ${ name }`);
    this.#currentState = this.#states.get(name);

    if (this.#currentState?.onEnter) {
      this.#currentState?.onEnter(args);
    }

    this.#isChangingState = false;
  }

  addState(state: StateMachine): void {
    state.stateMachine = this;
    this.#states.set(state.name, state);
  }

  #getInitialId(id: string | undefined): string {
    if(!id) {
      return Math.RND.uuid()
    }
    return id;
  }

  #isCurrentState(name: string): boolean {
    if(!this.#currentState) {
      return false;
    }
    return this.#currentState.name === name;
  }

  #logInput(methodName: string, message: string): void {
    console.log(`[${ StateMachineComponent.name }-${ this.#id }:${ methodName }] ${ message }`);
  }
}
