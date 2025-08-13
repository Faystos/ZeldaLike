import { WritableSignal } from "@angular/core";

export type InputKeyConfig = {
  up: WritableSignal<boolean>;
  down: WritableSignal<boolean>;
  left: WritableSignal<boolean>;
  right: WritableSignal<boolean>;
  actionKey: WritableSignal<boolean>;
  attackKey: WritableSignal<boolean>;
  selectKey: WritableSignal<boolean>;
  enterKey: WritableSignal<boolean>;
};
