import { inject, Injectable } from "@angular/core";
import { Scene } from 'phaser';

import { SCENE_KEYS } from "../scene-keys";
import { ASSET_KEYS } from "../../common/assets";
import { Player } from "../../game-object";
import { KeyboardInput } from "../../inputs";

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
  }

  #createPlayer(): void {
    this.#player = new Player({
      scene: this,
      position: {  x: this.scale.width / 2, y: this.scale.height / 2 },
      assetKey: ASSET_KEYS.PLAYER,
      controls: this.#controlsKeyboard
    });
  }

  #initControlsKeyboardPlugin(): void {
    this.#controlsKeyboard.setKeyboardPlugin(this.input.keyboard);
  }
}
