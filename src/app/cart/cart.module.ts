import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ToolbarModule } from '../components/toolbar/toolbar.module';
import { CartPageRoutingModule } from './cart-routing.module';
import { CartPage } from './cart.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    CartPageRoutingModule,
    ToolbarModule,
  ],
  declarations: [CartPage],
})
export class CartPageModule {}
