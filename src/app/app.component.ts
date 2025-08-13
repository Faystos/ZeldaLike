import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';

import { GameConfig } from './configs';
import { PhaserService } from "./phaser.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  #phaserService: PhaserService = inject(PhaserService);

  ngOnInit(): void {
    this.#initGame();
  }

  #initGame(): void {
    this.#phaserService.initGame(GameConfig);
  }
}
