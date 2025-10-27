import { ArcadePhysicsBody } from './types';
import { Physics } from 'phaser';

export function exhaustiveGuard(_value: never): never {
  throw new Error(`Error! Reached forbidden guard function with unexpected value: ${JSON.stringify(_value)}`);
}

export function isArcadePhysicsBody(body: ArcadePhysicsBody ): body is Physics.Arcade.Body {
  if (!body) {
    return false;
  }

  return body instanceof Physics.Arcade.Body;
}
