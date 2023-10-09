import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateEventPage } from './create-event.page';
import { RestrictPageGuard } from 'src/app/guards/restrictPage.guard';
import { UserDataResolver } from 'src/app/resolvers/user-data.resolver';

const routes: Routes = [
  {
    path: '',
    component: CreateEventPage,
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
export class CreateEventPageRoutingModule {}
