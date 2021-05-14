import { Component } from '@angular/core';
import { HomeService } from './home.service';
import { Restaurante } from './restaurante/restaurante.interface';
import { map } from 'rxjs/operators';
import { setPath } from '../../util/image-path';
import { ModalController } from '@ionic/angular';
import { RestaurantePage } from './restaurante/restaurante.page';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  restaurantes: Restaurante[];
  constructor(
    private homeService: HomeService,
    private modalController: ModalController
  ) {}

  ionViewWillEnter() {
    this.getRestaurantes();
  }

  private getRestaurantes() {
    this.homeService
      .getRestaurantes()
      .pipe(
        map((restaurantes) =>
          restaurantes.map((restaurante) => {
            console.log(restaurante);

            setPath(restaurante.imagen, 'pequeno');
            return restaurante;
          })
        )
      )
      .subscribe({
        next: (restaurantes) => {
          this.restaurantes = restaurantes;
        },
      });
  }

  async onClickRestaurante(restaurante: Restaurante) {
    const modal = await this.modalController.create({
      component: RestaurantePage,
      componentProps: { restaurante },
    });
    await modal.present();
  }
}
