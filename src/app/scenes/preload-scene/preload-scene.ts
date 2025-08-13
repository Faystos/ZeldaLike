import { Scene } from 'phaser';

import { SCENE_KEYS } from "../scene-keys";
import { ASSET_KEYS, ASSET_PACK_KEYS } from "../../common/assets";

export class PreloadScene extends Scene {
  constructor() {
    super({
      key: SCENE_KEYS.PRELOAD_SCENE,
    });
  }

  public preload(): void {
    this.load.pack(ASSET_PACK_KEYS.MAIN, 'assets/data/assets.json');
  }

  public create(): void {
    this.#createAnimation();
    this.scene.start(SCENE_KEYS.START_SCENE);
  }

  #createAnimation(): void {
    this.anims.createFromAseprite(ASSET_KEYS.PLAYER)
  }
}
