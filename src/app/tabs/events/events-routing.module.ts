  import { NgModule } from '@angular/core';
  import { RouterModule, Routes } from '@angular/router';
  import { EventsPage } from './events.page';
  

  const routes: Routes = [
    {
      path: 'new',
      loadChildren: () => import('../../pages/create-event/create-event.module').then( m => m.CreateEventPageModule)
    },
    {
      path: ':id',
      loadChildren: () => import('../../pages/event/event.module').then( m => m.EventPageModule)
    },
    {
      path: '',
      component: EventsPage,
    }
  ];

  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class EventsPageRoutingModule {}


