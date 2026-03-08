import { Scene } from 'phaser';

import { Position } from '../../../common/types';
import { AnimationConfig } from '../../../components';
import { InputKey } from '../../../inputs';

export interface BaseCharacterConfig {
  scene: Scene;
  position: Position;
  assetKey: string;
  frame?: number;
  controls: InputKey;
  animationConfig: AnimationConfig;
  speed: number;
  id?: string;
  isPlayer: boolean;
}
