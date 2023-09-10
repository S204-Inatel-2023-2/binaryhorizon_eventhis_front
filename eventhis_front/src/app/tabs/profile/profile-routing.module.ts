import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilePage } from './profile.page';
import { UserDataResolver } from '../../resolvers/user-data.resolver';
import { RestrictPageGuard } from 'src/app/guards/restrictPage.guard';

const routes: Routes = [
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
