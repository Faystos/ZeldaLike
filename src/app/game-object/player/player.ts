import { Scenes } from 'phaser';

import { ASSET_KEYS, PLAYER_ANIMATION_KEYS } from '../../common/assets';
import { AnimationConfig } from '../../components';
import { IdleState, MoveState } from '../../components/state-machine-component/states';
import { CHARACTER_TYPE } from '../../components/state-machine-component/types/character.type';
import { PLAYER_CONFIG } from '../../configs';
import { BaseCharacter } from '../base-character';
import { PlayerConfig } from "./types";

export class Player extends BaseCharacter {
  constructor(config: PlayerConfig) {
    const animationConfig: AnimationConfig = {
      WALK_DOWN: { key: PLAYER_ANIMATION_KEYS.WALK_DOWN, repeat: -1, ignoreIfPlaying: true },
      WALK_UP: { key: PLAYER_ANIMATION_KEYS.WALK_UP, repeat: -1, ignoreIfPlaying: true },
      WALK_LEFT: { key: PLAYER_ANIMATION_KEYS.WALK_SIDE, repeat: -1, ignoreIfPlaying: true },
      WALK_RIGHT: { key: PLAYER_ANIMATION_KEYS.WALK_SIDE, repeat: -1, ignoreIfPlaying: true },
      IDLE_DOWN: { key: PLAYER_ANIMATION_KEYS.IDLE_DOWN, repeat: -1, ignoreIfPlaying: true },
      IDLE_UP: { key: PLAYER_ANIMATION_KEYS.IDLE_UP, repeat: -1, ignoreIfPlaying: true },
      IDLE_LEFT: { key: PLAYER_ANIMATION_KEYS.IDLE_SIDE, repeat: -1, ignoreIfPlaying: true },
      IDLE_RIGHT: { key: PLAYER_ANIMATION_KEYS.IDLE_SIDE, repeat: -1, ignoreIfPlaying: true },
    };
    super({
      ...config,
      id: 'player',
      isPlayer: true,
      animationConfig,
      speed: PLAYER_CONFIG.SPEED,
      assetKey: ASSET_KEYS.PLAYER
    });

    this.#initPlayerStateMachine();
    this.#playEventListeners(config);
  }

  #playEventListeners(config: PlayerConfig): void {
    config.scene.events.on(Scenes.Events.UPDATE, () => this.update());
    config.scene.events.once(Scenes.Events.SHUTDOWN, () => {
      config.scene.events.off(Scenes.Events.UPDATE, () => this.update());
    });
  }

  #initPlayerStateMachine(): void {
    this._stateMachine.addState(new IdleState(this));
    this._stateMachine.addState(new MoveState(this));
    this._stateMachine.setState(CHARACTER_TYPE.IDLE_STATE);
  }
}
