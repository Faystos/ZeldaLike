import { Injectable } from "@angular/core";
import { Input, Types } from 'phaser';

import { InputKey } from "../input-key";
import { KeyboardPlugin } from "../../common/types";

@Injectable({ providedIn: 'root' })
export class KeyboardInput extends InputKey {
  #keyboardPlugin!: KeyboardPlugin
  #cursorKeys!: Types.Input.Keyboard.CursorKeys;
  #attackKey!: Input.Keyboard.Key;
  #actionKey!: Input.Keyboard.Key;
  #enterKey!: Input.Keyboard.Key;

  constructor() {
    super();
  }

  override get isJustUp(): boolean {
    return Input.Keyboard.JustDown(this.#cursorKeys.up);
  }

  override get isUp(): boolean {
    return this.#cursorKeys.up.isDown
  }

  override get isJustDown(): boolean {
    return Input.Keyboard.JustDown(this.#cursorKeys.down);
  }

  override get isDown(): boolean {
    return this.#cursorKeys.down.isDown;
  }

  override get isLeft(): boolean {
    return this.#cursorKeys.left.isDown;
  }

  override get isRight(): boolean {
    return this.#cursorKeys.right.isDown;
  }

  override get isActionKey(): boolean {
    return Input.Keyboard.JustDown(this.#actionKey);
  }

  override get isAttackKey(): boolean {
    return Input.Keyboard.JustDown(this.#attackKey);
  }

  override get isSelectKey(): boolean {
    return Input.Keyboard.JustDown(this.#cursorKeys.shift)
  }

  override get isEnterKey(): boolean {
    return Input.Keyboard.JustDown(this.#enterKey)
  }

  setKeyboardPlugin(keyboardPlugin: KeyboardPlugin) {
    this.#keyboardPlugin = keyboardPlugin;
    this.#initKeyboardInputKeys(this.#keyboardPlugin);
  }

  #initKeyboardInputKeys(keyboardPlugin: KeyboardPlugin | undefined): void {
   if (keyboardPlugin) {
     this.#cursorKeys = keyboardPlugin!.createCursorKeys();
     this.#attackKey = keyboardPlugin!.addKey(Input.Keyboard.KeyCodes.Z);
     this.#actionKey = keyboardPlugin!.addKey(Input.Keyboard.KeyCodes.X);
     this.#enterKey = keyboardPlugin!.addKey(Input.Keyboard.KeyCodes.ENTER);
   }
  }
}
