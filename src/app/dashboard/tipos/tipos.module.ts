import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TiposRoutingModule } from './tipos-routing.module';
import { ListaTiposComponent } from './lista-tipos/lista-tipos.component';
import { CrearTiposComponent } from './crear-tipos/crear-tipos.component';
import { WebMaterialModule } from 'app/webmaterial.module';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListaTiposComponent,
    CrearTiposComponent
  ],
  imports: [
    CommonModule,
    TiposRoutingModule,
    WebMaterialModule,
    BreadcrumbComponent,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class TiposModule { }
