import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatChip, MatChipListbox } from '@angular/material/chips';
import { MatProgressBar } from '@angular/material/progress-bar';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Game } from '../../models/game.model';
import { NgStyle } from "@angular/common";

@Component({
  selector: 'app-game-card',
  imports: [MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent, MatChipListbox, MatChip, MatProgressBar, NgStyle],
  templateUrl: './game-card.html',
  styleUrls: ['./game-card.scss'],
})
export class GameCardComponent {
  @Input() game!: Game;
  @Input() selectedPlatform!: string;
  @Output() platformClicked = new EventEmitter<string>();
  background: string = '';

  ngOnInit() {
    this.setBackground();
  }

  ngOnChanges() {
    this.setBackground();
  }

  setBackground() {
    const img = new Image();
    img.onload = () => {
      this.background = this.game.coverUrl!;
    }
    img.onerror = () => {
      this.background = this.game.iconUrl;
    }
    img.src = this.game.coverUrl!;
  }

  handlePlatformClick() {
    if (this.game?.platform) {
      this.platformClicked.emit(this.game.platform);
    };
  }
}