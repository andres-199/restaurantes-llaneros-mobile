import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailPage } from './detail.page';
import { ModalBackButtonModule } from 'src/app/components/modal-back-button/modal-back-button.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ModalBackButtonModule],
  declarations: [DetailPage],
})
export class DetailPageModule {}
