import { BaseComponent } from '../base-component';
import { CharacterAnimation, GameObject } from '../../common/types';
import { AnimationConfig } from './types';

export class AnimationComponent extends BaseComponent {
  protected declare gameObject: Phaser.GameObjects.Sprite;
  readonly #config!: AnimationConfig;

  constructor(gameObject: GameObject, animationConfig: AnimationConfig) {
    super(gameObject);
    this.#config = animationConfig;
  }

  isAnimationPlaying(): boolean {
    return this.gameObject.anims.isPlaying
  }

  getAnimationKey(characterAnimationKey: CharacterAnimation): string | undefined {
    if(!this.#config[characterAnimationKey]) {
      return undefined
    }

    return this.#config[characterAnimationKey].key;
  }

  playAnimation(characterAnimationKey: CharacterAnimation, callback?: () => void): void {
    if(!this.#config[characterAnimationKey]) {
      if (callback) {
        callback();
      }

      return;
    }

    const animationConfig: Phaser.Types.Animations.PlayAnimationConfig = {
      key: this.#config[characterAnimationKey].key,
      repeat: this.#config[characterAnimationKey].repeat,
      timeScale: 1,
    };

    if (callback) {
      const animationKey = Phaser.Animations.Events.ANIMATION_COMPLETE_KEY + this.#config[characterAnimationKey].key;
      this.gameObject.once(animationKey, () => callback() );
    }

    this.gameObject.play(animationConfig, this.#config[characterAnimationKey].ignoreIfPlaying);
  }
}
