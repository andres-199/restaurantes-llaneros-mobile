import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { Restaurante } from './restaurante/restaurante.interface';
import { map } from 'rxjs/operators';
import { setPath } from '../../util/image-path';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  restaurantes: Restaurante[];
  constructor(private homeService: HomeService) {}

  ngOnInit() {
    this.getRestaurantes();
  }

  private getRestaurantes() {
    this.homeService
      .getRestaurantes()
      .pipe(
        map((restaurantes) =>
          restaurantes.map((restaurante) => {
            setPath(restaurante.imagen, 'pequeno');
            return restaurante;
          })
        )
      )
      .subscribe({
        next: (restaurantes) => {
          console.log(restaurantes);

          this.restaurantes = restaurantes;
        },
      });
  }
}
