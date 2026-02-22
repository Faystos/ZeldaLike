import { Physics, Scenes } from 'phaser';

import { PlayerConfig } from "./types";
import {
  AnimationComponent, AnimationConfig,
  ControlsComponent,
  DirectionComponent,
  SpeedComponent,
  StateMachineComponent
} from '../../components';
import { IdleState, MoveState } from '../../components/state-machine-component/states';
import { CHARACTER_TYPE } from '../../components/state-machine-component/types/character.type';
import { InputKey } from '../../inputs';
import { PLAYER_CONFIG } from '../../configs';
import { Direction } from '../../common/types';
import { PLAYER_ANIMATION_KEYS } from '../../common/assets';

export class Player extends Physics.Arcade.Sprite {
  readonly #controlsComponent!: ControlsComponent;
  readonly #speedComponent!: SpeedComponent;
  readonly #stateMachine!: StateMachineComponent;
  readonly #directionComponent!: DirectionComponent;
  readonly #animationComponent!: AnimationComponent;

  readonly #animationConfig: AnimationConfig = {
    WALK_DOWN: { key: PLAYER_ANIMATION_KEYS.WALK_DOWN, repeat: -1, ignoreIfPlaying: true },
    WALK_UP: { key: PLAYER_ANIMATION_KEYS.WALK_UP, repeat: -1, ignoreIfPlaying: true },
    WALK_LEFT: { key: PLAYER_ANIMATION_KEYS.WALK_SIDE, repeat: -1, ignoreIfPlaying: true },
    WALK_RIGHT: { key: PLAYER_ANIMATION_KEYS.WALK_SIDE, repeat: -1, ignoreIfPlaying: true },
    IDLE_DOWN: { key: PLAYER_ANIMATION_KEYS.IDLE_DOWN, repeat: -1, ignoreIfPlaying: true },
    IDLE_UP: { key: PLAYER_ANIMATION_KEYS.IDLE_UP, repeat: -1, ignoreIfPlaying: true },
    IDLE_LEFT: { key: PLAYER_ANIMATION_KEYS.IDLE_SIDE, repeat: -1, ignoreIfPlaying: true },
    IDLE_RIGHT: { key: PLAYER_ANIMATION_KEYS.IDLE_SIDE, repeat: -1, ignoreIfPlaying: true },
  };

  constructor(config: PlayerConfig) {
    const { scene, position, assetKey, frame, controls } = config;
    const { x, y } = position;
    super( scene, x, y, assetKey, frame ?? 0 );

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.#controlsComponent = new ControlsComponent(this, controls);
    this.#speedComponent = new SpeedComponent(this, PLAYER_CONFIG.SPEED);
    this.#stateMachine = new StateMachineComponent('player');
    this.#directionComponent = new DirectionComponent(this);
    this.#animationComponent = new AnimationComponent(this, this.#animationConfig);

    this.#initPlayerStateMachine();
    this.#playEventListeners(config);
  }

  override update(): void {
    this.#stateMachine.update();
  }

  get controls(): InputKey {
    return this.#controlsComponent.controls;
  }

  get speed(): number {
    return this.#speedComponent.speed;
  }

  get direction(): Direction {
    return this.#directionComponent.direction;
  }

  set direction(directionValue: Direction) {
    this.#directionComponent.direction = directionValue;
  }

  get animation(): AnimationComponent {
    return this.#animationComponent;
  }

  #playEventListeners(config: PlayerConfig): void {
    config.scene.events.on(Scenes.Events.UPDATE, () => this.update());
    config.scene.events.once(Scenes.Events.SHUTDOWN, () => {
      config.scene.events.off(Scenes.Events.UPDATE, () => this.update());
    });
  }

  #initPlayerStateMachine(): void {
    this.#stateMachine.addState(new IdleState(this));
    this.#stateMachine.addState(new MoveState(this));
    this.#stateMachine.setState(CHARACTER_TYPE.IDLE_STATE)
  }
}
