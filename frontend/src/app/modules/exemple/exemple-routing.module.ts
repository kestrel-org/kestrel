import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListeUsersComponent } from './components/liste-users/liste-users.component';


const routes: Routes = [
  {
    path: 'users',
    component: ListeUsersComponent
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
export class ExempleRoutingModule { }
