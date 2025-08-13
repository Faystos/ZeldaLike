import { signal } from "@angular/core";
import { InputKeyConfig } from "../types";

export class InputKey {
  #inputKeyConfig!: InputKeyConfig;

  get isUp(): boolean {
    return this.#inputKeyConfig!.up();
  }
  set up(value: boolean) {
    this.#inputKeyConfig!.up.set(value)
  }

  get isJustUp(): boolean {
    return this.#inputKeyConfig!.up();
  }

  get isDown(): boolean {
    return this.#inputKeyConfig!.down();
  }
  set down(value: boolean) {
    this.#inputKeyConfig!.down.set(value)
  }

  get isJustDown(): boolean {
    return this.#inputKeyConfig!.down();
  }

  get isLeft(): boolean {
    return this.#inputKeyConfig!.left();
  }
  set left(value: boolean) {
    this.#inputKeyConfig!.left.set(value)
  }

  get isRight(): boolean {
    return this.#inputKeyConfig!.right();
  }
  set right(value: boolean) {
    this.#inputKeyConfig!.right.set(value)
  }

  get isActionKey(): boolean {
    return this.#inputKeyConfig!.actionKey();
  }
  set actionKey(value: boolean) {
    this.#inputKeyConfig!.actionKey.set(value)
  }

  get isAttackKey(): boolean {
    return this.#inputKeyConfig!.attackKey();
  }
  set attackKey(value: boolean) {
    this.#inputKeyConfig!.attackKey.set(value)
  }

  get isSelectKey(): boolean {
    return this.#inputKeyConfig!.selectKey();
  }
  set selectKey(value: boolean) {
    this.#inputKeyConfig!.selectKey.set(value)
  }

  get isEnterKey(): boolean {
    return this.#inputKeyConfig!.enterKey();
  }
  set enterKey(value: boolean) {
    this.#inputKeyConfig!.enterKey.set(value)
  }

  constructor() {
    this.#initInputKeyConfig();
  }

  #initInputKeyConfig(): void {
    this.#inputKeyConfig = {
      up: signal(false),
      down: signal(false),
      left: signal(false),
      right: signal(false),
      actionKey: signal(false),
      attackKey: signal(false),
      selectKey: signal(false),
      enterKey: signal(false),
    }
  }

  resetInputKey(): void {
    this.#initInputKeyConfig();
  }
}
