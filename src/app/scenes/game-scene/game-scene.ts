import { Injectable, inject } from "@angular/core";
import { Scene } from 'phaser';

import { Player, Spider } from '../../game-object';
import { KeyboardInput } from '../../inputs';
import { SCENE_KEYS } from "../scene-keys";

@Injectable({ providedIn: 'root' })
export class GameScene extends Scene {
  #controlsKeyboard = inject(KeyboardInput);

  #player!: Player;

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
      position: {  x: this.scale.width / 2, y: this.scale.height / 2 },
      controls: this.#controlsKeyboard
    });
  }

  #createEnemies(): void {
    new Spider({
      scene: this,
      position: {  x: this.scale.width / 2, y: this.scale.height / 2 + 50 },
      controls: this.#controlsKeyboard
    })
  }

  #initControlsKeyboardPlugin(): void {
    this.#controlsKeyboard.setKeyboardPlugin(this.input.keyboard);
  }
}
