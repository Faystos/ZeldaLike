import { StateMachineComponent } from '../../state-machine-component';
import { Player } from '../../../../game-object';

export abstract class BaseCharacterState extends StateMachineComponent {
  protected _gameObject: Player;
  protected _stateMachine!: StateMachineComponent;
  #name: string;

  protected constructor(name: string, gameObject: Player) {
    super();
    this.#name = name;
    this._gameObject = gameObject;
  }

  get name(): string {
    return this.#name;
  }

  set stateMachine(stateMachine: StateMachineComponent) {
    this._stateMachine = stateMachine
  }
}
