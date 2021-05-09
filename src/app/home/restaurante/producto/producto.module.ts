import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductoPage } from './producto.page';
import { ModalBackButtonModule } from 'src/app/components/modal-back-button/modal-back-button.module';
import { NgImageFullscreenViewModule } from 'ng-image-fullscreen-view';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalBackButtonModule,
    NgImageFullscreenViewModule,
  ],
  declarations: [ProductoPage],
})
export class ProductoPageModule {}
