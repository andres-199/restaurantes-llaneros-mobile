import { Component } from '@angular/core';
import {
  AlertController,
  LoadingController,
  ModalController,
} from '@ionic/angular';
import { map } from 'rxjs/operators';
import { Venta } from '../cart/interfaces/venta.interface';
import { DetailPage } from './detail/detail.page';
import { PurchasesService } from './purchases.service';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.page.html',
  styleUrls: ['./purchases.page.scss'],
})
export class PurchasesPage {
  compras: Venta[];
  constructor(
    private purchasesService: PurchasesService,
    private modalController: ModalController,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {}

  ionViewWillEnter() {
    this.getCompras();
  }

  private getCompras() {
    this.purchasesService
      .getCompras()
      .pipe(
        map((compras) =>
          compras.map((compra) => {
            compra['estado'] = compra.valida
              ? { text: 'Aprovada', color: 'primary' }
              : compra.rechazada
              ? { text: 'Rechazada', color: 'danger' }
              : !compra.soporte_pago && !compra.metodo_pago.contra_entrega
              ? { text: 'Sin Soporte de Pago', color: 'danger' }
              : { text: 'Pendiente', color: 'secondary' };
            return compra;
          })
        )
      )
      .subscribe({
        next: (compras) => {
          this.compras = compras;
        },
      });
  }

  async onClickCompra(compra: Venta) {
    const isContraEntrega = compra.metodo_pago.contra_entrega;
    const soportePago = compra.soporte_pago;

    if (compra.rechazada || (!isContraEntrega && !soportePago)) {
      const response = await this.purchasesService.pay(
        compra,
        compra.Restaurant
      );
      if (response.data) this.getCompras();
    } else {
      this.showOrden(compra);
    }
  }

  private async showOrden(compra: Venta) {
    const modal = await this.modalController.create({
      component: DetailPage,
      componentProps: { compra },
    });

    await modal.present();
  }

  async onClickDelete(compra: Venta) {
    const alert = await this.alertController.create({
      header: 'Confirmar',

      message: 'La información se borará para siempre.',
      buttons: [
        'Cancelar',
        {
          text: 'Aceptar',
          handler: async () => await this.deleteCompra(compra),
        },
      ],
    });
    await alert.present();
  }

  private async deleteCompra(compra: Venta) {
    const loading = await this.loadingController.create({
      message: 'Eliminando...',
    });
    await loading.present();
    this.purchasesService.deleteCompra(compra).subscribe({
      next: async () => {
        this.getCompras();
        await loading.dismiss();
        const msg = 'Compra Eliminada ✔';
        this.purchasesService.showMsg(msg);
      },
    });
  }
}
