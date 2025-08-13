import { Physics } from 'phaser';

import {PLAYER_ANIMATION_KEYS} from "../../common/assets";
import {PlayerConfig} from "./types";

export class Player extends Physics.Arcade.Sprite {
  constructor(config: PlayerConfig) {
    const { scene, position, assetKey, frame  } = config;
    const { x, y } = position;
    super( scene, x, y, assetKey, frame ?? 0 );

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.#playStartAnimationPlayer();
  }

  #playStartAnimationPlayer(): void {
    this.play({ key: PLAYER_ANIMATION_KEYS.IDLE_DOWN, repeat: -1 });
  }
}
