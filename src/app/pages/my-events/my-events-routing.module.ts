import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyEventsPage } from './my-events.page';
import { UserDataResolver } from 'src/app/resolvers/user-data.resolver';
import { RestrictPageGuard } from 'src/app/guards/restrictPage.guard';

const routes: Routes = [
  {
    path: '',
    component: MyEventsPage,
    canActivate: [RestrictPageGuard],
    resolve: {
      userData: UserDataResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  
})
export class MyEventsPageRoutingModule {}
