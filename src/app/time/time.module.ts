import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ToolbarModule } from '../components/toolbar/toolbar.module';
import { TimePage } from './time.page';
import { TimePageRoutingModule } from './time-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TimePageRoutingModule,
    ToolbarModule,
  ],
  declarations: [TimePage],
})
export class TimePageModule {}
