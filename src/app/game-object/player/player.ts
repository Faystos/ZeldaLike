import { Physics, Scenes } from 'phaser';

import { PLAYER_ANIMATION_KEYS } from "../../common/assets";
import { PlayerConfig } from "./types";
import { InputKey } from "../../inputs";
import { ControlsComponent } from '../../components';
import { isArcadePhysicsBody } from '../../common/utils';

export class Player extends Physics.Arcade.Sprite {
  readonly #controlsComponent!: ControlsComponent;

  constructor(config: PlayerConfig) {
    const { scene, position, assetKey, frame, controls } = config;
    const { x, y } = position;
    super( scene, x, y, assetKey, frame ?? 0 );

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.#controlsComponent = new ControlsComponent(this, controls);
    this.#playStartAnimationPlayer();
    this.#playEventListeners(config);
  }

  override update(): void {
    this.#eventUpdate();
  }

  #playStartAnimationPlayer(): void {
    this.play({ key: PLAYER_ANIMATION_KEYS.IDLE_DOWN, repeat: -1 });
  }

  #playEventListeners(config: PlayerConfig): void {
    config.scene.events.on(Scenes.Events.UPDATE, () => this.update());
    config.scene.events.once(Scenes.Events.SHUTDOWN, () => {
      config.scene.events.off(Scenes.Events.UPDATE, () => this.update());
    });
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
    if (this.#controlsComponent.controls.isUp) {
      this.play({ key: PLAYER_ANIMATION_KEYS.WALK_UP, repeat: -1 }, true);
      this.#updateVelocity(false, -1);
    }
  }

  #eventDown(): void {
    if (this.#controlsComponent.controls.isDown) {
      this.play({ key: PLAYER_ANIMATION_KEYS.WALK_DOWN, repeat: -1 }, true);
      this.#updateVelocity(false, 1);
    }
  }

  #eventLeft(): void {
    if (this.#controlsComponent.controls.isLeft) {
      this.setFlipX(true);
      this.#updateVelocity(true, -1);

      if (!(this.#controlsComponent.controls.isUp || this.#controlsComponent.controls.isDown)) {
        this.play({ key: PLAYER_ANIMATION_KEYS.WALK_SIDE, repeat: -1 }, true);
      }
    }
  }

  #eventRight(): void {
    if (this.#controlsComponent.controls.isRight) {
      this.setFlipX(false);
      this.#updateVelocity(true, 1);

      if (!(this.#controlsComponent.controls.isUp || this.#controlsComponent.controls.isDown)) {
        this.play({ key: PLAYER_ANIMATION_KEYS.WALK_SIDE, repeat: -1 }, true);
      }
    }
  }

  #updateVelocity(isX: boolean, velocityValue: number): void {
    if (!isArcadePhysicsBody(this.body)) {
      return;
    }

    if (isX) {
      this.body.velocity.x = velocityValue;
      return;
    }

    this.body.velocity.y = velocityValue;
  }

  #stopVelocity() {
    if (
      !this.#controlsComponent.controls.isUp
      && !this.#controlsComponent.controls.isDown
      && !this.#controlsComponent.controls.isLeft
      && !this.#controlsComponent.controls.isRight
    ) {
      this.#updateVelocity(true, 0);
      this.#updateVelocity(false, 0);
      this.play({ key: PLAYER_ANIMATION_KEYS.IDLE_DOWN, repeat: -1 }, true);
    }
  }

  #normalizeVelocity(): void {
    if (!isArcadePhysicsBody(this.body)) {
      return;
    }

    this.body.velocity.normalize().scale(20)
  }
}
