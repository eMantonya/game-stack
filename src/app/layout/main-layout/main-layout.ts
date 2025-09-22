import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterModule, MatIcon],
  templateUrl: './main-layout.html',
  styleUrls: ['./main-layout.scss']
})
export class MainLayoutComponent {
  loginWithSteam() {
    window.open(
      'https://steam-auth-api-fmgdegchf2dec7bz.centralus-01.azurewebsites.net/api/auth/steam',
       '_blank', 
       'width=600,height=800, menubar=no, toolbar=no, location=no, status=no, scrollbars=yes, resizable=yes'
      );
  }
}