import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ROUTES_APP } from '../../core/enum/routes.enum';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  authService = inject(AuthenticationService)
  get ROUTES_APP(){
    return ROUTES_APP;
  }
  logOut(){
    this.authService.logout();
  }
}
