import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Restaurante } from '../home/restaurante/restaurante.interface';
import { Direccion } from '../interfaces/direccion.interface';
import { Tercero } from '../interfaces/tercero.interface';
import { Usuario } from '../interfaces/usuario.interface';

export interface Perfil {
  Tercero: Tercero;
  Restaurante: Restaurante;
}

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

  public register(tercero: Tercero) {
    const url = environment.BACKEND_URL + 'terceros';
    return this.http.post(url, tercero);
  }

  public getPerfil(terceroId: number) {
    const url = environment.BACKEND_URL + `terceros/${terceroId}/perfil`;
    return this.http.get<Perfil>(url);
  }

  createDireccion(direccion: Direccion) {
    const url = environment.BACKEND_URL + 'direcciones';
    return this.http.post<Direccion>(url, direccion);
  }
}
