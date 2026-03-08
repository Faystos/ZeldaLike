import { BaseCharacter } from '../../../../game-object';
import { StateMachineComponent } from '../../state-machine-component';

export abstract class BaseCharacterState extends StateMachineComponent {
  protected _gameObject: BaseCharacter;
  protected _stateMachine!: StateMachineComponent;
  #name: string;

  protected constructor(name: string, gameObject: BaseCharacter) {
    super();
    this.#name = name;
    this._gameObject = gameObject;
  }

  get name(): string {
    return this.#name;
  }

  set stateMachine(stateMachine: StateMachineComponent) {
    this._stateMachine = stateMachine;
  }
}
