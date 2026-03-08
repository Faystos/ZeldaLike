import { Scene } from 'phaser';
import { Position } from "../../../common/types";
import { InputKey } from "../../../inputs";

export type PlayerConfig = {
  scene: Scene;
  position: Position;
  controls: InputKey
};
