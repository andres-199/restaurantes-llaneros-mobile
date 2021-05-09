import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserService } from '../login/user.service';
import { Reserva } from './reserva.interface';

@Injectable({
  providedIn: 'root',
})
export class TimeService {
  constructor(private userService: UserService, private http: HttpClient) {}

  getReservas() {
    const user = this.userService.user;
    const url =
      environment.BACKEND_URL + `terceros/${user.tercero_id}/reservas`;
    return this.http.get<Reserva[]>(url);
  }

  deleteReserva(reserva: Reserva) {
    const user = this.userService.user;
    const url =
      environment.BACKEND_URL +
      `terceros/${user.tercero_id}/reservas/${reserva.id}`;
    return this.http.delete(url);
  }
}
