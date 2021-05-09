import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { map } from 'rxjs/operators';
import { Categoria } from 'src/app/interfaces/categoria.interface';
import { UserService } from 'src/app/login/user.service';
import { setPath } from 'src/util/image-path';
import { Restaurante } from './restaurante.interface';
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
    private restauranteService: RestauranteService,
    private userService: UserService,
    private toastController: ToastController,
    private alertController: AlertController
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
          handler: (data) => {
            console.log('Confirm Ok', data);
          },
        },
      ],
    });

    await alert.present();
  }
}
