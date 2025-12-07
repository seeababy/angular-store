import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  http = inject(HttpClient);
  apiUrl = 'http://localhost:5000';

  constructor( 
  ) { 
  }

  registration(data: any) {
    return this.http.post(`${this.apiUrl}/auth/registration`, data);
  }
}
