import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { setPath } from 'src/util/image-path';
import { Restaurante } from '../home/restaurante/restaurante.interface';
import { Categoria } from '../interfaces/categoria.interface';
import { RestauranteService } from './restaurante.service';

@Component({
  selector: 'app-restaurante',
  templateUrl: './restaurante.page.html',
  styleUrls: ['./restaurante.page.scss'],
})
export class RestaurantePage implements OnInit {
  restaurante: Restaurante;
  loading = false;
  constructor(
    private modalController: ModalController,
    private restauranteService: RestauranteService
  ) {}

  ngOnInit() {
    this.getRestaurante();
  }

  private getRestaurante() {
    this.loading = true;
    this.restauranteService
      .getById(this.restaurante.id)
      .pipe(
        map((restaurante) => {
          const categorias: Categoria[] = [];
          for (const producto of restaurante.Productos) {
            const index = categorias.findIndex(
              (categoria) => categoria.id === producto.Categoria.id
            );
            if (index >= 0) {
              categorias[index].Productos.push(producto);
            } else {
              const categoria = producto.Categoria;
              categoria.Productos = [producto];
              categorias.push(categoria);
            }
          }
          restaurante.Categorias = categorias;
          return restaurante;
        })
      )
      .subscribe({
        next: (restaurante: Restaurante) => {
          setPath(restaurante.imagen);
          restaurante.Productos.forEach((producto) =>
            producto.Imagenes.forEach((imagen) => setPath(imagen))
          );
          this.restaurante = restaurante;
          console.log(this.restaurante);
        },
        complete: () => {
          this.loading = false;
        },
      });
  }
}
