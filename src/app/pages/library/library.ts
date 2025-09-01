import { Component } from '@angular/core';
import { GameCardComponent } from '../../components/game-card/game-card';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { SteamService } from '../../services/steam';
import { Game } from '../../models/game.model';
import { MatDialog } from '@angular/material/dialog';
import { AddGameDialog } from '../../components/add-game-dialog/add-game-dialog';

@Component({
  selector: 'app-library',
  imports: [GameCardComponent, CommonModule, FormsModule, MatSelectModule, ReactiveFormsModule, MatInputModule],
  standalone: true,
  templateUrl: './library.html',
  styleUrl: './library.scss'
})
export class LibraryComponent {
  searchControl = new FormControl('');
  selectedGenre = '';
  selectedPlatform = '';
  steamId = '';
  games: Game[] = [];


  // Sample game data
/*   games = [
  {
    title: 'Elden Ring',
    genre: 'Action RPG',
    description: 'Explore the Lands Between and become the Elden Lord.',
    platform: 'PC',
    progress: 75
  },
  {
    title: 'Stardew Valley',
    genre: 'Simulation',
    description: 'Build your farm, make friends, and explore the valley.',
    platform: 'Switch',
    progress: 40
  },
  {
    title: 'Halo Infinite',
    genre: 'Shooter',
    description: 'Master Chief returns to battle the Banished.',
    platform: 'Xbox',
    progress: 90
  },
  {
    title: 'Hades',
    genre: 'Roguelike',
    description: 'Escape the Underworld in this fast-paced action game.',
    platform: 'PC',
    progress: 60
  },
  {
    title: 'The Legend of Zelda: Tears of the Kingdom',
    genre: 'Adventure',
    description: 'Explore Hyrule and the skies above in this epic sequel.',
    platform: 'Switch',
    progress: 30
  },
  {
    title: 'Cyberpunk 2077',
    genre: 'RPG',
    description: 'Navigate Night City as a mercenary in a dystopian future.',
    platform: 'PC',
    progress: 50
  },
  {
    title: 'God of War Ragnarök',
    genre: 'Action',
    description: 'Join Kratos and Atreus on a mythic journey through Norse realms.',
    platform: 'PlayStation',
    progress: 80
  },
  {
    title: 'Minecraft',
    genre: 'Sandbox',
    description: 'Build, explore, and survive in a blocky open world.',
    platform: 'PC',
    progress: 20
  },
  {
    title: 'Celeste',
    genre: 'Platformer',
    description: 'Climb the mountain and overcome inner struggles.',
    platform: 'Switch',
    progress: 100
  },
  {
    title: 'Forza Horizon 5',
    genre: 'Racing',
    description: 'Race across Mexico in stunning open-world environments.',
    platform: 'Xbox',
    progress: 65
  },
  {
    title: 'Disco Elysium',
    genre: 'Narrative RPG',
    description: 'Solve a murder in a gritty city as a deeply flawed detective.',
    platform: 'PC',
    progress: 45
  },
  {
    title: 'Hollow Knight',
    genre: 'Metroidvania',
    description: 'Explore the haunting world of Hallownest and uncover its secrets.',
    platform: 'Switch',
    progress: 70
  },
  {
    title: 'Red Dead Redemption 2',
    genre: 'Open World',
    description: 'Live the outlaw life in a stunning Wild West epic.',
    platform: 'PlayStation',
    progress: 85
  },
  {
    title: 'Slay the Spire',
    genre: 'Deckbuilder Roguelike',
    description: 'Craft your deck and climb the spire in this strategic challenge.',
    platform: 'PC',
    progress: 55
  },
  {
    title: 'Portal 2',
    genre: 'Puzzle',
    description: 'Solve mind-bending physics puzzles with a snarky AI companion.',
    platform: 'PC',
    progress: 100
  },
  {
    title: 'Fire Emblem: Three Houses',
    genre: 'Tactical RPG',
    description: 'Lead your students through war and politics in Fódlan.',
    platform: 'Switch',
    progress: 60
  },
  {
    title: 'The Witcher 3: Wild Hunt',
    genre: 'RPG',
    description: 'Track down Ciri and battle monsters in a rich fantasy world.',
    platform: 'PC',
    progress: 90
  },
  {
    title: 'Cuphead',
    genre: 'Run and Gun',
    description: 'Battle surreal bosses in 1930s cartoon style.',
    platform: 'Xbox',
    progress: 35
  },
  {
    title: 'Death Stranding',
    genre: 'Adventure',
    description: 'Reconnect a fractured world in this atmospheric journey.',
    platform: 'PlayStation',
    progress: 50
  },
  {
    title: 'Super Mario Odyssey',
    genre: 'Platformer',
    description: 'Travel across kingdoms with Cappy to rescue Princess Peach.',
    platform: 'Switch',
    progress: 75
  }
]; */

  constructor(private steamService: SteamService, private dialog: MatDialog) {}

  openAddGameDialog(): void {
    const dialogRef = this.dialog.open(AddGameDialog, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((newGames: Game[] | undefined) => {
      if (newGames && newGames.length) {
        this.games = [...this.games, ...newGames];
      }
    })
  }

  onSubmit(): void {
    if (!this.steamId) return;
    this.steamService.getSteamLibrary(this.steamId).subscribe({
      next: data => this.games = data,
      error: err => console.error('Steam API error', err)
    });
  }

  fetchSteamLibrary(steamId: string): void {
    this.steamService.getSteamLibrary(steamId).subscribe({
      next: data => this.games = data,
      error: err => console.error('Steam API error', err)
    });
  }

  get filteredGames() {
    const searchQuery = this.searchControl.value?.toLowerCase() || '';

    return this.games.filter(game =>
    (!this.selectedGenre || game.genre == this.selectedGenre) &&
    (!this.selectedPlatform || game.platform == this.selectedPlatform) &&
    (!searchQuery || game.title.toLowerCase().includes(searchQuery))
    );
  }

  applyPlatformFilter(platform: string) {
    this.selectedPlatform = platform;
  }

  clearFilters() {
    this.selectedGenre = '';
    this.selectedPlatform = '';
    this.searchControl.setValue('');
  }

   get genres() {
    return [... new Set(this.games.map(g => g.genre))];
  }

  get platforms() {
    return [... new Set(this.games.map(g => g.platform))];
  } 
}
