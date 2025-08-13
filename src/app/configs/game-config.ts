import { Types, WEBGL } from 'phaser';

export const GameConfig: Types.Core.GameConfig = {
  type: WEBGL,
  pixelArt: true,
  roundPixels: true,
  scale: {
    parent: 'game-container',
    width: 256,
    height: 224,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    mode: Phaser.Scale.HEIGHT_CONTROLS_WIDTH,
  },
  backgroundColor: '#000000',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0, x: 0 },
      debug: false,
    },
  },

  scene: [],
};
