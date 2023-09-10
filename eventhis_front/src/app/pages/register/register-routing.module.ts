import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterPage } from './register.page';
import { AuthPageGuard } from 'src/app/guards/authPage';

const routes: Routes = [
  {
    path: '',
    component: RegisterPage,
    canActivate: [AuthPageGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterPageRoutingModule {}
