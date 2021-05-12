import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AlertController,
  LoadingController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Producto } from '../home/restaurante/producto/producto.interfcae';
import { Imagen } from '../interfaces/imagen.interface';
import { MetodoPago } from '../interfaces/metodo-pago.interface';
import { Orden } from '../interfaces/orden.interface';
import { UserService } from '../login/user.service';
import { Carrito } from './interfaces/carrito.interface';
import { Venta } from './interfaces/venta.interface';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  totalOrdenes = new BehaviorSubject(0);
  constructor(
    private http: HttpClient,
    private userService: UserService,
    private toastController: ToastController,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private modalController: ModalController
  ) {
    this.updateTotalOrdenes();
  }

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

  async showMsg(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 5000,
      buttons: ['Aceptar'],
    });
    await toast.present();
  }

  getOrdenes() {
    const terceroId = this.userService.user?.tercero_id;
    const url = environment.BACKEND_URL + `terceros/${terceroId}/ordenes`;
    return this.http
      .get<Carrito[]>(url)
      .pipe(tap((ordenes) => this.totalOrdenes.next(ordenes.length)));
  }

  updateTotalOrdenes() {
    const user = this.userService.user;
    if (user) {
      this.getOrdenes().subscribe((ordenes) => {
        this.totalOrdenes.next(ordenes.length);
      });
    } else {
      this.totalOrdenes.next(0);
    }
  }

  deleteOrden(orden: Carrito) {
    const url = environment.BACKEND_URL + `carrito/${orden.id}`;
    return this.http.delete(url);
  }

  getPaymentMethods(restauranteId: number) {
    const url =
      environment.BACKEND_URL + `restaurantes/${restauranteId}/metodos-pago`;
    return this.http.get<MetodoPago[]>(url);
  }

  createOrden(orden: Orden) {
    const url = environment.BACKEND_URL + 'carrito/ordenar';
    return this.http.post<Orden>(url, orden);
  }

  updateOrdenVenta(venta: Venta) {
    const url = environment.BACKEND_URL + 'ventas';
    return this.http.put<Venta>(url, venta);
  }

  uploadImg(file: File) {
    const url = environment.STORAGE_URL + 'upload-img';
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post<Imagen[]>(url, formData);
  }
}
