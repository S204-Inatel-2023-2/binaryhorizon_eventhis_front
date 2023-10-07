import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommunityPage } from './community.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { CommunityPageRoutingModule } from './community-routing.module';

import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    CommunityPageRoutingModule,
    SharedModule
  ],
  declarations: [CommunityPage]
})
export class CommunityPageModule {}
