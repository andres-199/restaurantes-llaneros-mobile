import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PurchasePage } from './purchase.page';
import { ModalBackButtonModule } from 'src/app/components/modal-back-button/modal-back-button.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ModalBackButtonModule],
  declarations: [PurchasePage],
})
export class PurchasePageModule {}
