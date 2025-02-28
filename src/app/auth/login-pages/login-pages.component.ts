import { Component } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { MatInput } from '@angular/material/input';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login-pages',
standalone: true,
  imports: [MaterialModule, MatInput, RouterModule],
  templateUrl: './login-pages.component.html',
  styleUrl: './login-pages.component.css'
})
export class LoginPagesComponent {

}
