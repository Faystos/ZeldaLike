import { Scene } from 'phaser';
import { GameObject } from '../../common/types';

export class BaseComponent {
  protected scene: Scene;
  protected gameObject: GameObject;

  constructor(gameObject: GameObject) {
    this.scene = gameObject.scene;
    this.gameObject = gameObject;
    this.assignComponentToObject(gameObject);
  }

  static getComponent<T>(gameObject: GameObject): T {
    const propertyName = `_${this.name}` as keyof GameObject;

    if (gameObject[propertyName] === undefined) {
      throw new Error(`Component ${this.name} not found on GameObject`);
    }

    return gameObject[propertyName] as T;
  }

  static removeComponent(gameObject: GameObject): void {
    const propertyName = `_${this.name}` as keyof GameObject;

    if (propertyName in gameObject) {
      delete gameObject[propertyName];
    }
  }

  protected assignComponentToObject(object: GameObject): void {
    // @ts-ignore
    object[`_${this.constructor.name}`] = this;
  }
}
