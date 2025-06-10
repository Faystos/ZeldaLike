import * as Phaser from 'phaser';
import { SCENE_KEYS } from './scene-keys';
import { ASSET_PACK_KEYS } from '../common/assets';

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
