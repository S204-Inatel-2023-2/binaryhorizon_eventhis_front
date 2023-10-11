import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommunityPage } from './community.page';
import { RestrictPageGuard } from 'src/app/guards/restrictPage.guard';
import { UserDataResolver } from 'src/app/resolvers/user-data.resolver';

const routes: Routes = [
  {
    path: ':id',
    loadChildren: () => import('../../pages/user/user.module').then( m => m.UserPageModule)
  },
  {
    path: '',
    component: CommunityPage,
    canActivate: [RestrictPageGuard],
    resolve: {
      userData: UserDataResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommunityPageRoutingModule {}
