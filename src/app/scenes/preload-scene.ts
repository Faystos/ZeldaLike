import * as Phaser from 'phaser';

import { ASSET_PACK_KEYS } from '../common/assets';
import { SCENE_KEYS } from './scene-keys';

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super({
      key: SCENE_KEYS.PRELOAD_SCENE,
    });
  }

  public preload(): void {
    this.load.pack(ASSET_PACK_KEYS.MAIN, 'assets/data/assets.json');
  }

  public create(): void {
    this.scene.start(SCENE_KEYS.GAME_SCENE);
  }
}
