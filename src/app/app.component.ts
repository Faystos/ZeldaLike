import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Game } from 'phaser';

import { GameConfig } from './configs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  phaserGame!: Phaser.Game;

  ngOnInit(): void {
    new Game(GameConfig);
  }
}
