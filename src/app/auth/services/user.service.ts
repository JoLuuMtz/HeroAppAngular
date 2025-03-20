
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user.interface';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class UserService {
  constructor(private httpClient: HttpClient) { }


}
