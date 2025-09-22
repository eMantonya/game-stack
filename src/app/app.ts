import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Auth } from './services/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('game-stack');

  constructor(private auth: Auth) {}
  ngOnInit(): void {
    this.auth.loadUser();

    window.addEventListener('message', (event) => {
    if (event.data?.steamId) {
      this.auth.loadUser();
    }
  });
  }  
}
