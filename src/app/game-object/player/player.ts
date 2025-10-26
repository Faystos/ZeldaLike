import { Physics, Scenes } from 'phaser';

import { PLAYER_ANIMATION_KEYS } from "../../common/assets";
import { PlayerConfig } from "./types";
import { InputKey } from "../../inputs";
import { ControlsComponent } from '../../components';

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
  }

  #eventUp(): void {
    if (this.#controlsComponent.controls.isUp) {
      this.play({ key: PLAYER_ANIMATION_KEYS.IDLE_UP, repeat: -1 }, true);
    }
  }

  #eventDown(): void {
    if (this.#controlsComponent.controls.isDown) {
      this.play({ key: PLAYER_ANIMATION_KEYS.IDLE_DOWN, repeat: -1 }, true);
    }
  }

  #eventLeft(): void {
    if (this.#controlsComponent.controls.isLeft) {
      this.setFlipX(true);
      this.play({ key: PLAYER_ANIMATION_KEYS.IDLE_SIDE, repeat: -1 }, true);
    }
  }

  #eventRight(): void {
    if (this.#controlsComponent.controls.isRight) {
      this.setFlipX(false);
      this.play({ key: PLAYER_ANIMATION_KEYS.IDLE_SIDE, repeat: -1 }, true);
    }
  }
}
