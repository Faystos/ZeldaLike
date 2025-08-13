import { Scene } from 'phaser';

import { Player } from "../../game-object";
import { SCENE_KEYS } from "../scene-keys";
import { ASSET_KEYS } from "../../common/assets";

export class GameScene extends Scene {
  #player!: Player;

  constructor() {
    super({
      key: SCENE_KEYS.GAME_SCENE,
    });
  }

  public create(): void {
    this.#createPlayer();
  }

  #createPlayer(): void {
    this.#player = new Player({
      scene: this,
      position: {  x: this.scale.width / 2, y: this.scale.height / 2 },
      assetKey: ASSET_KEYS.PLAYER
    });
  }
}
