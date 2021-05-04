import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ExempleRoutingModule } from './exemple-routing.module';
import { ListeUsersComponent } from './components/liste-users/liste-users.component';
import { DirectivesModule } from './../../directives/directives.module';

import { DataTablesModule } from 'angular-datatables';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';


@NgModule({
  declarations: [
    ListeUsersComponent
  ],
  imports: [
    CommonModule,
    ExempleRoutingModule,
    DataTablesModule,
    SweetAlert2Module,
    DirectivesModule,
    FormsModule
  ]
})
export class ExempleModule { }
