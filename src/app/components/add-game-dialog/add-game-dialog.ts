import { Component } from '@angular/core';
import { SteamService } from '../../services/steam';
import { Game } from '../../models/game.model';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatDialogActions } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-game-dialog',
  imports: [MatDialogModule, FormsModule, MatProgressSpinnerModule, MatInputModule, MatDialogActions, MatTabsModule],
  templateUrl: './add-game-dialog.html',
  styleUrls: ['./add-game-dialog.scss']
})
export class AddGameDialog {
  steamId: string = '';
  steamGames: Game[] = [];
  loading = false;
  manualGame = {
    title: '',
    genre: '',
    platform: ''
  };

  constructor(private steamService: SteamService, private dialogRef: MatDialogRef<AddGameDialog>) {}

  addManualGame() {
    if (this.manualGame.title && this.manualGame.platform) {
      const newGame: Game = {
        appid: Date.now(),
        title: this.manualGame.title,
        genre: this.manualGame.genre || 'Unknown',
        platform: this.manualGame.platform,
        source: 'manual',
        playtimeHours: 0,
        progress: 0,
        description: 'No description available',
        iconUrl: '',
        coverUrl: ''
      };
      this.dialogRef.close([newGame]);
      console.log('Added manual game:', newGame);
      this.manualGame = { title: '', genre: '', platform: '' };
    }
  }

  getSteamLibrary() {
    if (!this.steamId) return;
    this.loading = true;
    this.steamService.getSteamLibrary(this.steamId).subscribe({
      next: (games: Game[]) => {
        this.steamGames = games;
        this.loading = false;
        this.dialogRef.close(this.steamGames);
        console.log('Games Retrieved', games);
      },
      error: (err: any) => {
        this.loading = false;
        console.error('Steam API error', err);
      }
    });
  }
}
