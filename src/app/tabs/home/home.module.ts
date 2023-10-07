import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';
import { HeaderComponent } from 'src/app/components/header/header.component';

import { HomePageRoutingModule } from './home-routing.module';

@NgModule({
  declarations: [
    HomePage,
    HeaderComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    HomePageRoutingModule
  ]
})
export class HomePageModule {}
