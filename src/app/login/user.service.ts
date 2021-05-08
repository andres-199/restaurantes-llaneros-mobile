import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Usuario } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private backendUrl = environment.BACKEND_URL;

  public get isLogedIn(): boolean {
    return localStorage.getItem('user') ? true : false;
  }

  public get user(): Usuario {
    return JSON.parse(localStorage.getItem('user'));
  }

  public set user(value: Usuario) {
    localStorage.setItem('user', JSON.stringify(value));
  }

  constructor(private router: Router, private http: HttpClient) {}

  public login(loginData: Usuario) {
    const url = this.backendUrl + 'auth/login';
    return this.http.post(url, loginData);
  }

  public logout() {
    localStorage.removeItem('user');
    this.router.navigate(['']);
  }
}
