import { inject, Injectable } from "@angular/core";
import { Scene } from "phaser";

import { GameScene, PreloadScene, StartScene } from "./scenes";

@Injectable({ providedIn: 'root' })
export class PhaserService {
  #preloadScene = inject(PreloadScene);
  #startScene = inject(StartScene);
  #gameScene = inject(GameScene);

  #scenes: Scene[] = [
    this.#preloadScene,
    this.#startScene,
    this.#gameScene,
  ];

  initGame(config: Phaser.Types.Core.GameConfig): void {
    new Phaser.Game({ ...config, scene: this.#scenes });
  }
}
