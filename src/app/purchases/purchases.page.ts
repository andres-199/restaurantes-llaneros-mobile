import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
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
    private modalController: ModalController
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
}
