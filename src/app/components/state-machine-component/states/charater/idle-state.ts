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
    this.#playIdleStateAnimation();
    this.#stopVelocity();
    console.log('IdleState: onEnter');
  }

  onUpdate() {
    this.#startVelocity();
  }

  #playIdleStateAnimation(): void {
    this._gameObject.play({ key: PLAYER_ANIMATION_KEYS.IDLE_DOWN, repeat: -1 });
  }

  #stopVelocity(): void {
    if (isArcadePhysicsBody(this._gameObject.body)) {
      this._gameObject.body.velocity.x = 0;
      this._gameObject.body.velocity.x = 0;
    }
  }

  #startVelocity(): void {
    const controls = this._gameObject.controls;

    if (!controls.isUp && controls.isDown && !controls.isLeft && !controls.isRight) {
      return;
    }

    this._stateMachine.setState(CHARACTER_TYPE.MOVE_STATE);
  }
}
