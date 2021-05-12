import { Component, Input, OnInit } from '@angular/core';
import {
  AlertController,
  LoadingController,
  ModalController,
} from '@ionic/angular';
import { Restaurante } from 'src/app/home/restaurante/restaurante.interface';
import { Direccion } from 'src/app/interfaces/direccion.interface';
import { MetodoPago } from 'src/app/interfaces/metodo-pago.interface';
import { Orden } from 'src/app/interfaces/orden.interface';
import { Tercero } from 'src/app/interfaces/tercero.interface';
import { UserService } from 'src/app/login/user.service';
import { CarritoService } from '../carrito.service';
import { Carrito } from '../interfaces/carrito.interface';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.page.html',
  styleUrls: ['./purchase.page.scss'],
})
export class PurchasePage implements OnInit {
  @Input() restaurante: Restaurante;
  ordenes: Carrito[] = [];
  tercero: Tercero;
  direccionSelected: Direccion;
  metodoPagoSelected: MetodoPago;
  metodosPago: MetodoPago[];
  constructor(
    private userService: UserService,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private carritoService: CarritoService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.getPerfil();
    this.getPaymentMethods();
    this.ordenes = this.restaurante.Ordenes.filter((orden) => orden.selected);
  }

  private getPerfil(loading?: HTMLIonLoadingElement) {
    const user = this.userService.user;
    this.userService.getPerfil(user.tercero_id).subscribe({
      next: async (perfil) => {
        if (perfil) {
          this.tercero = perfil.Tercero;
          await loading?.dismiss();
        }
      },
    });
  }

  private getPaymentMethods() {
    this.carritoService.getPaymentMethods(this.restaurante.id).subscribe({
      next: (paymentMethods) => {
        this.metodosPago = paymentMethods;
      },
    });
  }

  async onClickAddDireccion() {
    const alert = await this.alertController.create({
      header: 'Registrar Dirección',
      inputs: [
        {
          name: 'nombre',
          type: 'text',
          placeholder: 'Nombre (Escriba un nombre para su dirección)',
        },
        {
          name: 'direccion',
          type: 'text',
          placeholder: 'Dirección *',
        },
        {
          name: 'telefono',
          type: 'text',
          placeholder: 'Telefono',
        },
      ],
      buttons: [
        'Cancelar',
        {
          text: 'Aceptar',
          handler: (direccion: Direccion) => this.createDireccion(direccion),
        },
      ],
    });

    await alert.present();
  }

  private async createDireccion(direccion: Direccion) {
    const loading = await this.loadingController.create({
      message: 'Espere un momento...',
    });
    await loading.present();

    direccion.tercero_id = this.tercero.id;
    this.userService.createDireccion(direccion).subscribe({
      next: (_direccion) => {
        this.getPerfil(loading);
      },
    });
  }

  async onClickOrdenar() {
    if (!this.direccionSelected) {
      const msg = 'Seleccione la dirección de entrega.';
      this.carritoService.showMsg(msg);
      return false;
    }
    if (!this.metodoPagoSelected) {
      const msg = 'Seleccione el medio de pago. ';
      this.carritoService.showMsg(msg);
      return false;
    }

    await this.createOrden();
  }

  private async createOrden() {
    const loading = await this.loadingController.create({
      message: 'Espere un momento...',
    });
    await loading.present();

    const orden: Orden = {
      fecha: new Date(),
      detalles: this.ordenes,
      direccion_entrega: this.direccionSelected,
      metodo_pago: this.metodoPagoSelected,
    };

    this.carritoService.createOrden(orden).subscribe({
      next: async (_orden) => {
        await this.loadingController.dismiss();
        await this.modalController.dismiss(_orden);
      },
    });
  }
}
