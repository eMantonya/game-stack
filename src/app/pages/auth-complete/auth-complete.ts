import { Component, OnInit } from '@angular/core';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-auth-complete',
  standalone: true,
  template: `<p>Completing login...</p>`
})
export class AuthCompleteComponent implements OnInit {
  constructor(private auth: Auth) {}

  ngOnInit(): void {
    console.log('AuthCompleteComponent initialized');
    this.auth.loadUser(); 

    const steamIdSignal = this.auth.getSteamId();
    
    const interval = setInterval(() => {
      const steamId = steamIdSignal();
      console.log('Checking for steamId:');
      console.log('Current steamId:', steamId);

      if (window.opener && steamId) {
        console.log('Steam ID found, posting to opener window....closing popup');
        window.opener.postMessage({ steamId }, '*');
        window.close();
        clearInterval(interval);
      }
    }, 500);
    setTimeout(() => { console.warn('Timed out. Steam ID not found'); clearInterval(interval)}, 10000); // Stop trying after 5 seconds
  }
}