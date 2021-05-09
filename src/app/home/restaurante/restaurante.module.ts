import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalBackButtonModule } from '../../components/modal-back-button/modal-back-button.module';
import { RestaurantePage } from './restaurante.page';
import { ProductoPageModule } from './producto/producto.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalBackButtonModule,
    ProductoPageModule,
  ],
  declarations: [RestaurantePage],
})
export class RestaurantePageModule {}
