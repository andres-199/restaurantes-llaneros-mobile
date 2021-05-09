import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { Producto } from '../home/restaurante/producto/producto.interfcae';
import { UserService } from '../login/user.service';
import { Carrito } from './carrito.interface';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  constructor(
    private http: HttpClient,
    private userService: UserService,
    private toastController: ToastController,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {}

  onAddProduct(producto: Producto) {
    const isLogedIn = this.userService.isLogedIn;
    if (!isLogedIn) {
      const msg =
        'Ingresa con tu cuenta o registrate para agregar productos 🥓🍖🥩🍗🍔🥐🥞🍠🍤🍪🍩🍮 al carrito';
      this.showMsg(msg);
      return;
    }

    this.showAlert(producto);
  }

  private async showAlert(producto: Producto) {
    const price = Number(producto.precio).toLocaleString('es-CO');
    console.log(price);

    const alert = await this.alertController.create({
      header: 'Agregar al carrito',
      subHeader: producto.nombre,
      message: `$ ${price}`,
      inputs: [
        {
          name: 'cantidad',
          type: 'number',
          value: 1,
          placeholder: 'Cantidad',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
        },
        {
          text: 'Agregar',
          handler: (carrito: Carrito) => {
            carrito.Producto = producto;
            if (carrito.cantidad > 0) this.addShoppingCart(carrito);
            else this.showMsg('Indique la cantidad del producto a agregar 🛒');
          },
        },
      ],
    });

    await alert.present();
  }

  private async addShoppingCart({ Producto, cantidad }: Carrito) {
    const loading = await this.loadingController.create({
      message: 'Agregando productos 🛒...',
    });
    await loading.present();

    const url = environment.BACKEND_URL + 'carrito';
    const user = this.userService.user;
    const carrito: Carrito = {
      fecha: new Date(),
      producto_id: Producto.id,
      tercero_id: user.tercero_id,
      cantidad,
    };

    this.http.post<Carrito>(url, carrito).subscribe({
      next: async (carrito) => {
        const msg = `Se agragarón ${cantidad} ${Producto.nombre} al carrito`;
        this.showMsg(msg);
        await loading.dismiss();
      },
      error: async (err) => {
        this.showMsg('No es posible agregar al carrito.');
        await loading.dismiss();
      },
    });
  }

  private async showMsg(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 5000,
      buttons: ['Aceptar'],
    });
    await toast.present();
  }
}
