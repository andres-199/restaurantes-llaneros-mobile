import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { Venta } from '../cart/interfaces/venta.interface';
import { PayPage } from '../cart/pay/pay.page';
import { Restaurante } from '../home/restaurante/restaurante.interface';
import { Orden } from '../interfaces/orden.interface';
import { UserService } from '../login/user.service';

@Injectable({
  providedIn: 'root',
})
export class PurchasesService {
  constructor(
    private userService: UserService,
    private http: HttpClient,
    private modalController: ModalController,
    private toastController: ToastController
  ) {}

  getCompras() {
    const user = this.userService.user;
    const url = environment.BACKEND_URL + `terceros/${user.tercero_id}/compras`;
    return this.http.get<Venta[]>(url);
  }

  async pay(orden: Orden, restaurante: Restaurante) {
    const modal = await this.modalController.create({
      component: PayPage,
      componentProps: {
        orden,
        restaurante,
      },
    });

    await modal.present();

    const response = await modal.onDidDismiss();

    if (response.data) {
      this.orderSuccess();
    }
    return response;
  }

  orderSuccess() {
    const msg =
      'Orden registrada ✔, en un momento el Restaurante revisará tu orden.';
    this.showMsg(msg);
  }

  async showMsg(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 5000,
      buttons: ['Aceptar'],
    });
    await toast.present();
  }
}
