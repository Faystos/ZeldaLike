import { Scene } from 'phaser';

import { Position } from '../../../../common/types';
import { InputKey } from '../../../../inputs';

export interface SpiderConfig {
  scene: Scene;
  position: Position;
  controls: InputKey;
}
