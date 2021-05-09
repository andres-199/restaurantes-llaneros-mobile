import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { Tab1PageRoutingModule } from './home-routing.module';
import { ToolbarModule } from '../components/toolbar/toolbar.module';
import { RestaurantePageModule } from './restaurante/restaurante.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab1PageRoutingModule,
    ToolbarModule,
    RestaurantePageModule,
  ],
  declarations: [HomePage],
})
export class HomePageModule {}
