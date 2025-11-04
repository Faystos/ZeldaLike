import { BaseCharacterState } from './base-character-state';
import { Player } from '../../../../game-object';
import { CHARACTER_TYPE } from '../../types/character.type';
import { PLAYER_ANIMATION_KEYS } from '../../../../common/assets';
import { isArcadePhysicsBody } from '../../../../common/utils';

export class IdleState extends BaseCharacterState {
  constructor(gameObject: Player) {
    super(CHARACTER_TYPE.IDLE_STATE, gameObject);
  }

  onEnter() {
    console.log('onEnter: ',this._gameObject.direction);
    this.#playIdleStateAnimation();
    this.#stopVelocity();
  }

  onUpdate() {
    this.#startVelocity();
  }

  #playIdleStateAnimation(): void {
    this._gameObject.play({ key: PLAYER_ANIMATION_KEYS.IDLE_DOWN, repeat: -1 });
  }

  #stopVelocity(): void {
    if (isArcadePhysicsBody(this._gameObject.body)) {
      this._gameObject.body.setVelocity(0, 0);
    }
  }

  #startVelocity(): void {
    const controls = this._gameObject.controls;

    if (controls.isUp || controls.isDown || controls.isLeft || controls.isRight) {
      this._stateMachine.setState(CHARACTER_TYPE.MOVE_STATE);
    }
  }
}
