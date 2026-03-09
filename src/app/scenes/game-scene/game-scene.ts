import { Injectable } from "@angular/core";
import { Scene } from 'phaser';

import { Player, Spider } from '../../game-object';
import { InputKey, KeyboardInput } from '../../inputs';
import { SCENE_KEYS } from "../scene-keys";

@Injectable({ providedIn: 'root' })
export class GameScene extends Scene {
  #controlsKeyboard = new KeyboardInput();

  #player!: Player;
  #spider!: Spider;

  constructor() {
    super({
      key: SCENE_KEYS.GAME_SCENE,
    });
  }

  public create(): void {
    this.#initControlsKeyboardPlugin();
    this.#createPlayer();
    this.#createEnemies();
  }

  #createPlayer(): void {
    this.#player = new Player({
      scene: this,
      position: { x: this.scale.width / 2, y: this.scale.height / 2 },
      controls: this.#controlsKeyboard,
    });
  }

  #createEnemies(): void {
    this.#spider = new Spider({
      scene: this,
      position: { x: this.scale.width / 2, y: this.scale.height / 2 + 50 },
      controls: new InputKey(),
    });

    this.#spider.setCollideWorldBounds(true);
  }

  #initControlsKeyboardPlugin(): void {
    this.#controlsKeyboard.setKeyboardPlugin(this.input.keyboard);
  }

  override update() {
    this.#spider.update();
  }
}
