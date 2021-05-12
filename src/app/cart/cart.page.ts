import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { setPath } from 'src/util/image-path';
import { Restaurante } from '../home/restaurante/restaurante.interface';
import { Orden } from '../interfaces/orden.interface';
import { Carrito } from './interfaces/carrito.interface';
import { CarritoService } from './carrito.service';
import { PayPage } from './pay/pay.page';
import { PurchasePage } from './purchase/purchase.page';
import { PurchasesService } from '../purchases/purchases.service';

@Component({
  selector: 'app-cart',
  templateUrl: 'cart.page.html',
  styleUrls: ['cart.page.scss'],
})
export class CartPage {
  restaurantes: Restaurante[];
  constructor(
    private carritoService: CarritoService,
    private modalController: ModalController,
    private purchaseService: PurchasesService
  ) {}

  ionViewWillEnter() {
    this.getRestaurantes();
  }

  private getRestaurantes() {
    this.carritoService
      .getOrdenes()
      .pipe(map(this.setOrdenesTorestaurasntes))
      .subscribe({
        next: (restaurantes) => {
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
          i--;
        }
      }

      if (restaurante.Ordenes.length < 1) {
        this.restaurantes.splice(index, 1);
        index--;
      }
    }
  }

  async onClickOrdenar(restaurante: Restaurante) {
    if (!(restaurante.valorTotalOrdenes > 0)) {
      const msg = 'Selecciona almenos un producto 🍗🥓🥩🍖';
      this.carritoService.showMsg(msg);
      return false;
    }

    const modal = await this.modalController.create({
      component: PurchasePage,
      componentProps: {
        restaurante,
      },
    });

    await modal.present();

    modal.onDidDismiss().then(async (response) => {
      if (response.data) {
        const orden: Orden = response.data;
        if (orden.metodo_pago.contra_entrega) {
          this.getRestaurantes();
          this.purchaseService.orderSuccess();
        } else {
          this.getRestaurantes();
          await this.purchaseService.pay(orden, restaurante);
        }
      }
    });
  }
}
