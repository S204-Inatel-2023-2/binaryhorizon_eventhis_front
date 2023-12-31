import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsPage } from './events.page';
import { UserDataResolver } from 'src/app/resolvers/user-data.resolver';
  

const routes: Routes = [
  {
    path: 'new',
    loadChildren: () => import('../../pages/create-event/create-event.module').then( m => m.CreateEventPageModule)
  },
  {
    path: 'my-events',
    loadChildren: () => import('../../pages/my-events/my-events.module').then( m => m.MyEventsPageModule)
  },
  {
    path: ':id',
    loadChildren: () => import('../../pages/event/event.module').then( m => m.EventPageModule)
  },
  {
    path: '',
    component: EventsPage,
    resolve: {
      userData: UserDataResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsPageRoutingModule {}


