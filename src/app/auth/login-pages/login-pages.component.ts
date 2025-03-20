import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { MatInput } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { routes } from '../../app.routes';

@Component({
  selector: 'app-login-pages',
  standalone: true,
  imports: [MaterialModule, MatInput, RouterModule],
  templateUrl: './login-pages.component.html',
  styleUrl: './login-pages.component.css'
})
export class LoginPagesComponent {

  private readonly _authService: AuthService = inject(AuthService);
  private readonly _router: Router = inject(Router);

  
  login(): void {
    this._authService.login("xd", "xd").subscribe(
      (user) => {
        // this._authService.getUser
        this._router.navigate(['/heroes/list']);
      }

    );
  }







}
