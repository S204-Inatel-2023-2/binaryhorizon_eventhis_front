import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPage } from './login.page';
import { AuthPageGuard } from 'src/app/guards/authPage';

const routes: Routes = [
  {
    path: '',
    component: LoginPage,
    canActivate: [AuthPageGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
