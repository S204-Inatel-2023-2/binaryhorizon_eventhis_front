import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilePage } from './profile.page';
import { UserDataResolver } from '../../resolvers/user-data.resolver';
import { RestrictPageGuard } from 'src/app/guards/restrictPage.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('../../pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('../../pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: '',
    component: ProfilePage,
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
export class ProfilePageRoutingModule {}
