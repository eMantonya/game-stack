import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private steamId = signal<string | null>(null);
  constructor(private http: HttpClient) {}

  loadUser() {
    this.http.get<{ steamId: string}> ('https://steam-auth-api-fmgdegchf2dec7bz.centralus-01.azurewebsites.net/api/auth/me', {
      withCredentials: true
    }).subscribe({
      next: user => this.steamId.set(user.steamId),
      error: () => this.steamId.set(null)
    });
  }

  getSteamId() {
    return this.steamId;
  }
}
