import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PurchasesPageRoutingModule } from './purchases-routing.module';

import { PurchasesPage } from './purchases.page';
import { ToolbarModule } from '../components/toolbar/toolbar.module';
import { DetailPageModule } from './detail/detail.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PurchasesPageRoutingModule,
    ToolbarModule,
    DetailPageModule,
  ],
  declarations: [PurchasesPage],
})
export class PurchasesPageModule {}
