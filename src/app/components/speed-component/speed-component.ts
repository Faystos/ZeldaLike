import { BaseComponent } from '../base-component';
import { GameObject } from '../../common/types';

export class SpeedComponent extends BaseComponent {
  #speed: number;
  constructor(gameObject: GameObject, speedValue: number) {
    super(gameObject);
    this.#speed = speedValue;
  }

  get speed(): number {
    return this.#speed;
  }
}
