import { Physics, Scenes } from 'phaser';

import { PlayerConfig } from "./types";
import { ControlsComponent, StateMachineComponent } from '../../components';
import { IdleState, MoveState } from '../../components/state-machine-component/states';
import { CHARACTER_TYPE } from '../../components/state-machine-component/types/character.type';
import { InputKey } from '../../inputs';

export class Player extends Physics.Arcade.Sprite {
  readonly #controlsComponent!: ControlsComponent;
  #stateMachine!: StateMachineComponent;

  constructor(config: PlayerConfig) {
    const { scene, position, assetKey, frame, controls } = config;
    const { x, y } = position;
    super( scene, x, y, assetKey, frame ?? 0 );

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.#controlsComponent = new ControlsComponent(this, controls);

    this.#initPlayerStateMachine();
    this.#playEventListeners(config);
  }

  override update(): void {
    this.#stateMachine.update();
  }

  get controls(): InputKey {
    return this.#controlsComponent.controls;
  }

  #playEventListeners(config: PlayerConfig): void {
    config.scene.events.on(Scenes.Events.UPDATE, () => this.update());
    config.scene.events.once(Scenes.Events.SHUTDOWN, () => {
      config.scene.events.off(Scenes.Events.UPDATE, () => this.update());
    });
  }

  #initPlayerStateMachine(): void {
    this.#stateMachine = new StateMachineComponent('player');
    this.#stateMachine.addState(new IdleState(this));
    this.#stateMachine.addState(new MoveState(this));
    this.#stateMachine.setState(CHARACTER_TYPE.IDLE_STATE)
  }
}
