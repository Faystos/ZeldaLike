import { Input } from "phaser";

import { CHARACTER_ANIMATIONS } from './assets';

export type KeyboardPlugin = Input.Keyboard.KeyboardPlugin;

export type CharacterAnimation = keyof typeof CHARACTER_ANIMATIONS;

export type AnimationSetting = {
  alpha: number;
  duration: number;
  yoyo: boolean;
  repeat: number;
  ease: string;
}

export type Position = {
  x: number;
  y: number;
};
