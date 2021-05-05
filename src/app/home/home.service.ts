import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient) {}

  getRestaurantes() {
    const url = environment.BACKEND_URL + 'restaurantes';
    return this.http.get(url);
  }
}
