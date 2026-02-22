import { CharacterAnimation } from '../../../common/types';

export type AnimationConfig = {
  [key in CharacterAnimation]?: { key: string, repeat: number, ignoreIfPlaying: boolean };
};
