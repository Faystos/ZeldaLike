import { Scene } from 'phaser';
import { Position } from "../../../common/types";

export type PlayerConfig = {
  scene: Scene;
  position: Position;
  assetKey: string;
  frame?: number;
};
