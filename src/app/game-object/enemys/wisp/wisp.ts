import { ASSET_KEYS, WISP_ANIMATION_KEYS } from '../../../common/assets';
import { AnimationConfig } from '../../../components';
import { IdleState, MoveState } from '../../../components/state-machine-component/states';
import { CHARACTER_TYPE } from '../../../components/state-machine-component/types/character.type';
import { SPIDER_CONFIG } from '../../../configs/enemy-config';
import { BaseCharacter } from '../../base-character';
import { WispConfig } from './types';

export class Wisp extends BaseCharacter {
  constructor(config: WispConfig) {
    const animationConfig: AnimationConfig = {
      WALK_DOWN: { key: WISP_ANIMATION_KEYS.IDLE, repeat: -1, ignoreIfPlaying: true },
      WALK_UP: { key: WISP_ANIMATION_KEYS.IDLE, repeat: -1, ignoreIfPlaying: true },
      WALK_LEFT: { key: WISP_ANIMATION_KEYS.IDLE, repeat: -1, ignoreIfPlaying: true },
      WALK_RIGHT: { key: WISP_ANIMATION_KEYS.IDLE, repeat: -1, ignoreIfPlaying: true },
      IDLE_DOWN: { key: WISP_ANIMATION_KEYS.IDLE, repeat: -1, ignoreIfPlaying: true },
      IDLE_UP: { key: WISP_ANIMATION_KEYS.IDLE, repeat: -1, ignoreIfPlaying: true },
      IDLE_LEFT: { key: WISP_ANIMATION_KEYS.IDLE, repeat: -1, ignoreIfPlaying: true },
      IDLE_RIGHT: { key: WISP_ANIMATION_KEYS.IDLE, repeat: -1, ignoreIfPlaying: true },
    };

    super({
      ...config,
      id: `spider-${Phaser.Math.RND.uuid()}`,
      isPlayer: false,
      animationConfig,
      speed: SPIDER_CONFIG.SPEED,
      assetKey: ASSET_KEYS.SPIDER,
    });

    this.#initStateMachine();
  }

  #initStateMachine(): void {
    this._stateMachine.addState(new IdleState(this));
    this._stateMachine.addState(new MoveState(this));
    this._stateMachine.setState(CHARACTER_TYPE.IDLE_STATE);
  }
}
