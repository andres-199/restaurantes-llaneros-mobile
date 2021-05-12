import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ToolbarModule } from '../components/toolbar/toolbar.module';
import { CartPageRoutingModule } from './cart-routing.module';
import { CartPage } from './cart.page';
import { PurchasePageModule } from './purchase/purchase.module';
import { PayPageModule } from './pay/pay.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    CartPageRoutingModule,
    ToolbarModule,
    PurchasePageModule,
    PayPageModule,
  ],
  declarations: [CartPage],
})
export class CartPageModule {}
