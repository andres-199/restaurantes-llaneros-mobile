import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalBackButtonComponent } from './modal-back-button.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [ModalBackButtonComponent],
  imports: [CommonModule, IonicModule],
  exports: [ModalBackButtonComponent],
})
export class ModalBackButtonModule {}
