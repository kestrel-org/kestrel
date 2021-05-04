import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

import { ExempleModule } from './modules/exemple/exemple.module';

const routes: Routes = [
  {
    path: 'exemple',
    loadChildren: () => ExempleModule
  },
  { path: '**', pathMatch: 'full', redirectTo: 'exemple' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
