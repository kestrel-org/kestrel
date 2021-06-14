import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersListComponent } from './components/users-list/users-list.component';


const routes: Routes = [
  {
    path: 'users',
    component: UsersListComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'users'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExampleRoutingModule { }
