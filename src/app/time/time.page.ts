import { Component } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { Reserva } from './reserva.interface';
import { TimeService } from './time.service';

@Component({
  selector: 'app-time',
  templateUrl: 'time.page.html',
  styleUrls: ['time.page.scss'],
})
export class TimePage {
  reservas: Reserva[];
  constructor(
    private timeService: TimeService,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) {}

  ionViewWillEnter() {
    this.getReservas();
  }

  private getReservas() {
    this.timeService.getReservas().subscribe({
      next: (reservas) => {
        this.reservas = reservas;
      },
    });
  }

  async onClickDelete(reserva: Reserva) {
    const loading = await this.loadingController.create({
      message: 'Espere un momento...',
    });
    await loading.present();

    this.deleteReserva(reserva, loading);
  }

  private deleteReserva(reserva: Reserva, loading: HTMLIonLoadingElement) {
    this.timeService.deleteReserva(reserva).subscribe({
      next: async () => {
        await loading.dismiss();
        this.getReservas();
        const message = ` ✔ Se eliminó la reserva en ${reserva.Restaurant?.nombre}`;
        const toast = await this.toastController.create({
          message,
          duration: 5000,
          buttons: ['Aceptar'],
        });
        await toast.present();
      },
    });
  }
}
