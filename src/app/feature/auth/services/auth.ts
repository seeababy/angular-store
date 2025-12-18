import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { LoginData } from '../pages/entities/login.interface';
import { RegistrationData } from '../pages/entities/registration.interface';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  http = inject(HttpClient);
  apiUrl = 'http://localhost:5000';

  constructor( 
  ) { 
  }

  registration(data: RegistrationData) {
    return this.http.post<{token: string}>(`${this.apiUrl}/auth/registration`, data);
  }

  login(data: LoginData) {
    return this.http.post<{token: string}>(`${this.apiUrl}/auth/login`, data);
  }
}
