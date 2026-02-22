import { BaseComponent } from '../base-component';
import { Direction, GameObject } from '../../common/types';

export class DirectionComponent extends BaseComponent {
  #direction: Direction = Direction.DOWN;
  readonly #callback: (direction: Direction) => void;

  constructor(gameObject: GameObject, onDirectionCallback = () => undefined) {
    super(gameObject);
    this.#callback = onDirectionCallback;
  }

  get direction(): Direction {
    return this.#direction;
  }

  set direction(directionValue: Direction) {
    this.#direction = directionValue;
    this.#callback(this.#direction);
  }
}
