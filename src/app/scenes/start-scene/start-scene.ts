import { Scene, GameObjects } from 'phaser';

import { SCENE_KEYS } from "../scene-keys";
import { ASSET_KEYS } from "../../common/assets";
import { AnimationSetting } from "../../common/types";

export class StartScene extends Scene {
  constructor() {
    super({
      key: SCENE_KEYS.START_SCENE,
    });
  }

  create(): void {
    this.#startScene();
  }

  #startScene(): void {
    this. #renderStartSceneText();
    this.#renderStartGameButton();
    this.#setEvents();
  }

  #renderStartSceneText(): void {
    this.add
      .text(this.scale.width / 2, this.scale.height / 2, 'Start Scene', { fontFamily: ASSET_KEYS.FONT_PRESS_START_2P })
      .setOrigin(0.5);
  }

  #renderStartGameButton(): void {
    const animationSetting: AnimationSetting = {
      alpha: 0.3,
      duration: 1000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    };

    const startButton = this.#createStartButton();
    this.#createAnimation(startButton, animationSetting);
  }

  #setEvents(): void {
    this.input.on('pointerdown', () => {
      this.scene.start(SCENE_KEYS.GAME_SCENE);
    });
  }

  #createStartButton(): GameObjects.Text {
    return this.add.text(
      this.scale.width / 2,
      this.scale.height / 1.1,
      'Tap to start',
      {
        fontFamily: ASSET_KEYS.FONT_PRESS_START_2P,
        font: '9px',
      }
    ).setOrigin(0.5);
  }

  #createAnimation(targets: GameObjects.Text, animationSetting: AnimationSetting): void {
    this.tweens.add({
      targets,
      ...animationSetting
    });
  }
}
