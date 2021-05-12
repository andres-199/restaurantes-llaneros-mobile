import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { Restaurante } from 'src/app/home/restaurante/restaurante.interface';
import { Imagen } from 'src/app/interfaces/imagen.interface';
import { environment } from 'src/environments/environment';
import { CarritoService } from '../carrito.service';
import { Venta } from '../interfaces/venta.interface';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.page.html',
  styleUrls: ['./pay.page.scss'],
})
export class PayPage implements OnInit {
  @Input() restaurante: Restaurante;
  @Input() orden: Venta;

  paymentSupport: Imagen;
  showPaymentSupportFull = false;
  constructor(
    private carritoService: CarritoService,
    private loadingController: LoadingController,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.paymentSupport = this.orden.soporte_pago;
  }

  async onLoadImage(files: File[]) {
    if (!files?.length) return false;
    const loading = await this.loadingController.create({
      message: 'Cargando el soporte...',
    });
    await loading.present();

    this.carritoService.uploadImg(files[0]).subscribe({
      next: async (images) => {
        this.paymentSupport = images[0];
        await loading.dismiss();
      },
      error: async (e) => {
        await loading.dismiss();
      },
    });
  }

  get paymentSupportThumbnail() {
    return (
      environment.STORAGE_URL +
      this.paymentSupport?.path.replace('original', 'pequeno')
    );
  }

  get paymentSupportFull() {
    return environment.STORAGE_URL + this.paymentSupport?.path;
  }

  onClickAceptar() {
    const oldPaymentSupport = this.orden?.soporte_pago;

    if (this.paymentSupport) {
      if (this.paymentSupport !== oldPaymentSupport) {
        this.orden.soporte_pago = this.paymentSupport;
        this.carritoService.updateOrdenVenta(this.orden).subscribe({
          next: async (venta) => {
            await this.modalController.dismiss(this.orden);
          },
        });
      }
    }
  }
}
