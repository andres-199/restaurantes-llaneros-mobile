import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PurchasesPageRoutingModule } from './purchases-routing.module';

import { PurchasesPage } from './purchases.page';
import { ToolbarModule } from '../components/toolbar/toolbar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PurchasesPageRoutingModule,
    ToolbarModule,
  ],
  declarations: [PurchasesPage],
})
export class PurchasesPageModule {}
