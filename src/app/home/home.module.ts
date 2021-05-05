import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { Tab1PageRoutingModule } from './home-routing.module';
import { ToolbarModule } from '../components/toolbar/toolbar.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab1PageRoutingModule,
    ToolbarModule,
  ],
  declarations: [HomePage],
})
export class HomePageModule {}
