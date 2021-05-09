import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reserva } from 'src/app/time/reserva.interface';
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

  createReserva(reserva: Reserva) {
    const url = environment.BACKEND_URL + 'reservas';
    return this.http.post<Reserva>(url, reserva);
  }
}
