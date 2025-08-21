import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatChip, MatChipListbox } from '@angular/material/chips';
import { MatProgressBar } from '@angular/material/progress-bar';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-game-card',
  imports: [MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent, MatChipListbox, MatChip, MatProgressBar],
  templateUrl: './game-card.html',
  styleUrls: ['./game-card.scss'],
})
export class GameCardComponent {
  @Input() game!: {
    title: string;
    genre: string;
    description: string;
    platform: string;
    progress: number;
  };
  @Input() selectedPlatform!: string;
  @Output() platformClicked = new EventEmitter<string>();

  handlePlatformClick() {
    if (this.game?.platform) {
      this.platformClicked.emit(this.game.platform);
    };
  }
}