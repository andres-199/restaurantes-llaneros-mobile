import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Restaurante } from './restaurante.interface';

@Injectable({
  providedIn: 'root',
})
export class RestauranteService {
  constructor(private http: HttpClient) {}

  getById(restauranteId: number) {
    const url = environment.BACKEND_URL + `restaurantes/${restauranteId}`;
    return this.http.get<Restaurante>(url);
  }
}
