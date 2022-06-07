import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { ExampleRoutingModule } from "./example-routing.module";
import { UsersListComponent } from "./pages/users-list/users-list.component";
import { DirectivesModule } from "./../../directives/directives.module";

import { DataTablesModule } from "angular-datatables";
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [UsersListComponent, HeaderComponent],
  imports: [
    CommonModule,
    ExampleRoutingModule,
    DataTablesModule,
    SweetAlert2Module,
    DirectivesModule,
    FormsModule,
  ],
})
export class ExampleModule {}
