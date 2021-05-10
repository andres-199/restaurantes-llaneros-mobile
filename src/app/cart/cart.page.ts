import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { setPath } from 'src/util/image-path';
import { Restaurante } from '../home/restaurante/restaurante.interface';
import { Carrito } from './carrito.interface';
import { CarritoService } from './carrito.service';

@Component({
  selector: 'app-cart',
  templateUrl: 'cart.page.html',
  styleUrls: ['cart.page.scss'],
})
export class CartPage {
  restaurantes: Restaurante[];
  constructor(private carritoService: CarritoService) {}

  ionViewWillEnter() {
    this.getRestaurantes();
  }

  private getRestaurantes() {
    this.carritoService
      .getOrdenes()
      .pipe(map(this.setOrdenesTorestaurasntes))
      .subscribe({
        next: (restaurantes) => {
          console.log(restaurantes);
          this.restaurantes = restaurantes;
        },
      });
  }

  private setOrdenesTorestaurasntes(ordenes: Carrito[]) {
    const restaurantes: Restaurante[] = [];
    for (const orden of ordenes) {
      orden.Producto.Imagenes.forEach((imagen) => setPath(imagen));

      const index = restaurantes.findIndex(
        (restaurante) => restaurante.id == orden.Producto.restaurante_id
      );

      if (index >= 0) {
        restaurantes[index].Ordenes.push(orden);
      } else {
        const restaurante = { ...orden.Producto.Restaurant };
        restaurante.valorTotalOrdenes = 0;
        restaurante.Ordenes = [orden];
        restaurantes.push(restaurante);
      }
    }
    return restaurantes;
  }

  onSelectAll(selected, restaurante: Restaurante) {
    restaurante.Ordenes.forEach((orden) => {
      const isSelected =
        (orden.selected && selected) || (!orden.selected && !selected)
          ? true
          : false;

      orden.selected = selected;
      if (!isSelected) this.onSelect(orden, restaurante);
    });
  }

  onSelect(orden: Carrito, restaurante: Restaurante) {
    if (orden.selected)
      restaurante.valorTotalOrdenes += orden.cantidad * orden.Producto.precio;
    else
      restaurante.valorTotalOrdenes -= orden.cantidad * orden.Producto.precio;
  }

  async onClickDelete() {
    for (let index = 0; index < this.restaurantes.length; index++) {
      const restaurante = this.restaurantes[index];

      for (let i = 0; i < restaurante.Ordenes.length; i++) {
        const orden = restaurante.Ordenes[i];

        if (orden.selected) {
          await this.carritoService.deleteOrden(orden).toPromise();
          orden.selected = !orden.selected;
          this.onSelect(orden, restaurante);
          restaurante.Ordenes.splice(i, 1);
          const message = `Se eliminó ${orden.Producto?.nombre} del carrito ✔`;
          await this.carritoService.showMsg(message);
          console.log(i);
          i--;
        }
      }

      if (restaurante.Ordenes.length < 1) {
        this.restaurantes.splice(index, 1);
        index--;
      }
    }
  }
}
