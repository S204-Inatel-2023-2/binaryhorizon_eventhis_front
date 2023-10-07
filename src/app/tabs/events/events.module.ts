import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventsPage } from './events.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { EventsPageRoutingModule } from './events-routing.module';

import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    EventsPage
  ],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    EventsPageRoutingModule,
    SharedModule
  ]
})
export class EventsPageModule {}
