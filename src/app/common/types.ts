import { Input, GameObjects, Physics } from 'phaser';

import { CHARACTER_ANIMATIONS } from './assets';
import { isArcadePhysicsBody } from './utils';

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

export type GameObject = GameObjects.Sprite | GameObjects.Image;

export type ArcadePhysicsBody = Physics.Arcade.Body | Physics.Arcade.StaticBody | MatterJS.Body | null;
