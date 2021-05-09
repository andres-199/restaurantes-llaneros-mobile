import { Component, Input, OnInit } from '@angular/core';
import {
  AlertController,
  LoadingController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { map } from 'rxjs/operators';
import { Categoria } from 'src/app/interfaces/categoria.interface';
import { Reserva } from 'src/app/time/reserva.interface';
import { UserService } from 'src/app/login/user.service';
import { setPath } from 'src/util/image-path';
import { Restaurante } from './restaurante.interface';
import { RestauranteService } from './restaurante.service';
import { Producto } from './producto/producto.interfcae';
import { ProductoPage } from './producto/producto.page';
import { CarritoService } from 'src/app/cart/carrito.service';

@Component({
  selector: 'app-restaurante',
  templateUrl: './restaurante.page.html',
  styleUrls: ['./restaurante.page.scss'],
})
export class RestaurantePage implements OnInit {
  @Input() restaurante: Restaurante;
  loading = false;
  constructor(
    private modalController: ModalController,
    private restauranteService: RestauranteService,
    private userService: UserService,
    private toastController: ToastController,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private carritoService: CarritoService
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
        },
        complete: () => {
          this.loading = false;
        },
      });
  }

  async onClickReservar() {
    const isLogedIn = this.userService.isLogedIn;
    if (!isLogedIn) {
      const message = 'Ingresa con tu cuenta o registrate para Reservar 🕐';
      const toast = await this.toastController.create({
        message,
        duration: 5000,
        buttons: ['Aceptar'],
      });
      await toast.present();
      return false;
    }

    this.showalert();
  }

  private async showalert() {
    const alert = await this.alertController.create({
      header: 'Reserva en ' + this.restaurante.nombre,
      inputs: [
        {
          type: 'datetime-local',
          name: 'fecha',
          attributes: {
            required: true,
          },
        },

        {
          name: 'numero_mesas',
          type: 'number',
          placeholder: 'Número de Mesas',
          attributes: { required: true },
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Reservar',
          handler: (reserva: Reserva) => {
            this.createReserva(reserva);
          },
        },
      ],
    });

    await alert.present();
  }

  private async createReserva(reserva: Reserva) {
    const loading = await this.loadingController.create({
      message: 'Espere un momento...',
    });
    await loading.present();

    const user = this.userService.user;
    reserva.tercero_id = user.tercero_id;
    reserva.restaurante_id = this.restaurante.id;

    this.restauranteService.createReserva(reserva).subscribe({
      next: async (_reserva) => {
        await loading.dismiss();

        const message = `Se reservarón ${
          _reserva.numero_mesas
        } mesas para el ${_reserva.fecha.toLocaleString()}`;

        const toast = await this.toastController.create({
          message,
          duration: 5000,
          buttons: ['Aceptar'],
        });
        await toast.present();
      },
    });
  }

  async onClickProducto(producto: Producto) {
    const modal = await this.modalController.create({
      component: ProductoPage,
      componentProps: { producto, restaurante: this.restaurante },
    });
    await modal.present();
  }

  onClickCart(producto: Producto) {
    this.carritoService.onAddProduct(producto);
  }
}
