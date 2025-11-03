import { BaseCharacterState } from './base-character-state';
import { Player } from '../../../../game-object';
import { CHARACTER_TYPE } from '../../types/character.type';
import { PLAYER_ANIMATION_KEYS } from '../../../../common/assets';
import { isArcadePhysicsBody } from '../../../../common/utils';

export class MoveState extends BaseCharacterState {
  constructor(gameObject: Player) {
    super(CHARACTER_TYPE.MOVE_STATE, gameObject);
  }

  onUpdate() {
    this.#eventUpdate();
  }

  #eventUpdate(): void {
    this.#eventUp();
    this.#eventDown();
    this.#eventLeft();
    this.#eventRight();
    this.#stopVelocity();
    this.#normalizeVelocity();
  }

  #eventUp(): void {
    if (this._gameObject.controls.isUp) {
      this._gameObject.play({ key: PLAYER_ANIMATION_KEYS.WALK_UP, repeat: -1 }, true);
      this.#updateVelocity(false, -1);
    }
  }

  #eventDown(): void {
    if (this._gameObject.controls.isDown) {
      this._gameObject.play({ key: PLAYER_ANIMATION_KEYS.WALK_DOWN, repeat: -1 }, true);
      this.#updateVelocity(false, 1);
    }
  }

  #eventLeft(): void {
    if (this._gameObject.controls.isLeft) {
      this._gameObject.setFlipX(true);
      this.#updateVelocity(true, -1);

      if (!(this._gameObject.controls.isUp || this._gameObject.controls.isDown)) {
        this._gameObject.play({ key: PLAYER_ANIMATION_KEYS.WALK_SIDE, repeat: -1 }, true);
      }
    }
  }

  #eventRight(): void {
    if (this._gameObject.controls.isRight) {
      this._gameObject.setFlipX(false);
      this.#updateVelocity(true, 1);

      if (!(this._gameObject.controls.isUp || this._gameObject.controls.isDown)) {
        this._gameObject.play({ key: PLAYER_ANIMATION_KEYS.WALK_SIDE, repeat: -1 }, true);
      }
    }
  }

  #stopVelocity(): void {
    const controls = this._gameObject.controls;
    if (!controls.isUp && !controls.isDown && !controls.isLeft && !controls.isRight) {
      this._stateMachine.setState(CHARACTER_TYPE.IDLE_STATE);
      this.#updateVelocity(true, 0);
      this.#updateVelocity(false, 0);
      return;
    }
  }

  #updateVelocity(isX: boolean, velocityValue: number): void {
    if (!isArcadePhysicsBody(this._gameObject.body)) {
      return;
    }

    if (isX) {
      this._gameObject.body.velocity.x = velocityValue;
      return;
    }

    this._gameObject.body.velocity.y = velocityValue;
  }

  #normalizeVelocity(): void {
    if (!isArcadePhysicsBody(this._gameObject.body)) {
      return;
    }

    this._gameObject.body.velocity.normalize().scale(20)
  }
}
