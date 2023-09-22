import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { UserDataResolver } from 'src/app/resolvers/user-data.resolver';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    resolve: {
      userData: UserDataResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
