import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilePage } from './profile.page';
import { UserDataResolver } from '../../resolvers/user-data.resolver';
import { RestrictPageGuard } from 'src/app/guards/restrictPage.guard';
import { LoginPage } from '../../pages/login/login.page';
import { RegisterPage } from 'src/app/pages/register/register.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage,
    canActivate: [RestrictPageGuard],
    resolve: {
      userData: UserDataResolver
    }
  },
  {
    path: 'login',
    component: LoginPage
  },
  {
    path: 'register',
    component: RegisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfilePageRoutingModule {}
