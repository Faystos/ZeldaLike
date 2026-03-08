import { ASSET_KEYS, SPIDER_ANIMATION_KEYS } from '../../../common/assets';
import { AnimationConfig } from '../../../components';
import { IdleState, MoveState } from '../../../components/state-machine-component/states';
import { CHARACTER_TYPE } from '../../../components/state-machine-component/types/character.type';
import { SPIDER_CONFIG } from '../../../configs/enemy-config';
import { BaseCharacter } from '../../base-character';
import { SpiderConfig } from './types';

export class Spider extends BaseCharacter {
  constructor(config: SpiderConfig) {
    const animationConfig: AnimationConfig = {
      WALK_DOWN: { key: SPIDER_ANIMATION_KEYS.WALK, repeat: -1, ignoreIfPlaying: true },
      WALK_UP: { key: SPIDER_ANIMATION_KEYS.WALK, repeat: -1, ignoreIfPlaying: true },
      WALK_LEFT: { key: SPIDER_ANIMATION_KEYS.WALK, repeat: -1, ignoreIfPlaying: true },
      WALK_RIGHT: { key: SPIDER_ANIMATION_KEYS.WALK, repeat: -1, ignoreIfPlaying: true },
      IDLE_DOWN: { key: SPIDER_ANIMATION_KEYS.WALK, repeat: -1, ignoreIfPlaying: true },
      IDLE_UP: { key: SPIDER_ANIMATION_KEYS.WALK, repeat: -1, ignoreIfPlaying: true },
      IDLE_LEFT: { key: SPIDER_ANIMATION_KEYS.WALK, repeat: -1, ignoreIfPlaying: true },
      IDLE_RIGHT: { key: SPIDER_ANIMATION_KEYS.WALK, repeat: -1, ignoreIfPlaying: true },
    };

    super({
      ...config,
      id: `spider-${Phaser.Math.RND.uuid()}`,
      isPlayer: false,
      animationConfig,
      speed: SPIDER_CONFIG.SPEED,
      assetKey: ASSET_KEYS.SPIDER,
    });

    this.#initPlayerStateMachine();
  }

  #initPlayerStateMachine(): void {
    this._stateMachine.addState(new IdleState(this));
    this._stateMachine.addState(new MoveState(this));
    this._stateMachine.setState(CHARACTER_TYPE.IDLE_STATE);
  }
}
