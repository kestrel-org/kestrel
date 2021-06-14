import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExampleModule } from './modules/example/example.module';

const routes: Routes = [
  {
    path: 'example',
    loadChildren: () => ExampleModule
  },
  { path: '**', pathMatch: 'full', redirectTo: 'example' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
