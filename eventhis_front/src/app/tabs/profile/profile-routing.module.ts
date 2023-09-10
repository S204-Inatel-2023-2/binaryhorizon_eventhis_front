import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilePage } from './profile.page';
import { UserDataResolver } from '../../resolvers/user-data.resolver';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage,
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
