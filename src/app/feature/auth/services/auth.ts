import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { LoginData } from '../pages/entities/login.interface';
import { RegistrationData } from '../pages/entities/registration.interface';
import { ApiResponse } from '../../../core/entities/interfaces/api-response.interface';
import { AuthResponse } from '../pages/entities/interfaces/auth-response.interface';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  http = inject(HttpClient);
  apiUrl = 'http://localhost:3000/api';

  constructor( 
  ) { 
  }

  registration(data: RegistrationData) {
    return this.http.post<ApiResponse<AuthResponse>>(`${this.apiUrl}/auth/register`, data);
  }

  login(data: LoginData) {
    return this.http.post<ApiResponse<AuthResponse>>(`${this.apiUrl}/auth/login`, data);
  }
}
