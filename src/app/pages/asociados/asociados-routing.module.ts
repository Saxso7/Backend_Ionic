import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AsociadosPage } from './asociados.page';

const routes: Routes = [
  {
    path: '',
    component: AsociadosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AsociadosPageRoutingModule {}
