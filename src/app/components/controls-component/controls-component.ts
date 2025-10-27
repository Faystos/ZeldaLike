import { BaseComponent } from '../base-component';
import { InputKey } from '../../inputs';
import { GameObject } from '../../common/types';

export class ControlsComponent extends BaseComponent {
  readonly #inputComponent: InputKey;

  constructor(gameObject: GameObject, inputComponent: InputKey) {
    super(gameObject);
    this.#inputComponent = inputComponent;
  }

  get controls(): InputKey {
    return this.#inputComponent;
  }
}
