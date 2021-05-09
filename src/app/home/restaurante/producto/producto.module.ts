import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductoPage } from './producto.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [ProductoPage],
})
export class ProductoPageModule {}
