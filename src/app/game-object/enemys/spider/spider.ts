import { ASSET_KEYS, SPIDER_ANIMATION_KEYS } from '../../../common/assets';
import { Direction } from '../../../common/types';
import { exhaustiveGuard } from '../../../common/utils';
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

    this._directionComponent.directionCallback = (direction: Direction) => {
      this.#handleDirectionChange(direction);
    };

    this.#initStateMachine();
    this.#getSceneTimeEvent();
  }

  #initStateMachine(): void {
    this._stateMachine.addState(new IdleState(this));
    this._stateMachine.addState(new MoveState(this));
    this._stateMachine.setState(CHARACTER_TYPE.IDLE_STATE);
  }

  #changeDirection(): void {
    this.controls.resetInputKey();

    this.scene.time.delayedCall(SPIDER_CONFIG.CHANGE_DIRECTION_DELAY_WAIT, () => {
      const randomDirection = Phaser.Math.Between(0, 3);

      if (randomDirection === 0) {
        this.controls.up = true;
      } else if (randomDirection === 1) {
        this.controls.right = true;
      } else if (randomDirection === 2) {
        this.controls.down = true;
      } else {
        this.controls.left = true;
      }

      this.#getSceneTimeEvent();
    });
  }

  #handleDirectionChange(direction: Direction): void {
    switch (direction) {
      case Direction.DOWN:
        this.setAngle(0);
        break;
      case Direction.UP:
        this.setAngle(180);
        break;
      case Direction.LEFT:
        this.setAngle(90);
        break;
      case Direction.RIGHT:
        this.setAngle(270);
        break;
      default:
        exhaustiveGuard(direction);
    }
  }

  #getSceneTimeEvent(): Phaser.Time.TimerEvent {
    return this.scene.time.addEvent({
      delay: Phaser.Math.Between(SPIDER_CONFIG.CHANGE_DIRECTION_DELAY_MIN, SPIDER_CONFIG.CHANGE_DIRECTION_DELAY_MAX),
      callback: this.#changeDirection,
      callbackScope: this,
      loop: false,
    });
  }
}
