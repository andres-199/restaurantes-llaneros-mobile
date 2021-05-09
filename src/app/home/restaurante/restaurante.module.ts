import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalBackButtonModule } from '../../components/modal-back-button/modal-back-button.module';
import { RestaurantePage } from './restaurante.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ModalBackButtonModule],
  declarations: [RestaurantePage],
})
export class RestaurantePageModule {}
