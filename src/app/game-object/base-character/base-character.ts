import { Physics } from 'phaser';

import { AnimationComponent, ControlsComponent, DirectionComponent, SpeedComponent, StateMachineComponent } from '../../components';
import { BaseCharacterConfig } from './types';
import { InputKey } from '../../inputs';
import { Direction } from '../../common/types';

export class BaseCharacter extends Physics.Arcade.Sprite {
  protected readonly _controlsComponent!: ControlsComponent;
  protected readonly _speedComponent!: SpeedComponent;
  protected readonly _stateMachine!: StateMachineComponent;
  protected readonly _directionComponent!: DirectionComponent;
  protected readonly _animationComponent!: AnimationComponent;
  protected readonly _isPlayer!: boolean;

  constructor(config: BaseCharacterConfig) {
    const { scene, position, assetKey, frame, controls, animationConfig, speed, id, isPlayer } = config;
    const { x, y } = position;
    super( scene, x, y, assetKey, frame ?? 0 );

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this._controlsComponent = new ControlsComponent(this, controls);
    this._speedComponent = new SpeedComponent(this, speed);
    this._stateMachine = new StateMachineComponent(id);
    this._directionComponent = new DirectionComponent(this);
    this._animationComponent = new AnimationComponent(this, animationConfig);

    this._isPlayer = isPlayer;
  }

  get controls(): InputKey {
    return this._controlsComponent.controls;
  }

  get speed(): number {
    return this._speedComponent.speed;
  }

  get direction(): Direction {
    return this._directionComponent.direction;
  }

  set direction(directionValue: Direction) {
    this._directionComponent.direction = directionValue;
  }

  get animation(): AnimationComponent {
    return this._animationComponent;
  }

  get isEnemy(): boolean {
    return !this._isPlayer;
  }

  public override update(): void {
    this._stateMachine.update();
  }
}
