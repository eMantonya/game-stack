import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from '../models/game.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SteamService {
  private baseUrl = 'https://getsteamlibrary-djazf6gxeyh6amdn.centralus-01.azurewebsites.net/api/steam/library';

  constructor(private http: HttpClient) { }

  getSteamLibrary(steamId: string): Observable<Game[]> {
    const url = `${this.baseUrl}?steamId=${steamId}`;
    return this.http.get<any[]>(url).pipe(
      map(games => games.map(game => ({
        appId: game.appId,
        title: game.name,
        playtimeHours: 0, //Math.round(game.playtime_forever / 60)
        iconUrl: `https://media.steampowered.com/steamcommunity/public/images/apps/${game.appId}/${game.img_icon_url}.jpg`,
        source: 'steam',
        genre: 'Unknown', // Genre might not be available in the API response
        platform: 'PC',
        progress: 0, //Might use achievement progress here
        description: 'No description available'
      })))
    );
  }
}
