import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccesoRoutingModule } from './acceso-routing.module';
import { WebMaterialModule } from 'app/webmaterial.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { ListarAccesoComponent } from './listar-acceso/listar-acceso.component';
import { FiltersComponent } from '@shared/components/filters/filters.component';


@NgModule({
  declarations: [
    ListarAccesoComponent,
  ],
  imports: [
    CommonModule,
    AccesoRoutingModule,
    WebMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BreadcrumbComponent,
    FiltersComponent
  ]
})
export class AccesoModule { }
