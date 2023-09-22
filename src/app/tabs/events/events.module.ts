import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventsPage } from './events.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { EventsPageRoutingModule } from './events-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    EventsPageRoutingModule
  ],
  declarations: [EventsPage]
})
export class EventsPageModule {}
