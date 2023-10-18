import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsociadosPageRoutingModule } from './asociados-routing.module';

import { AsociadosPage } from './asociados.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsociadosPageRoutingModule
  ],
  declarations: [AsociadosPage]
})
export class AsociadosPageModule {}
