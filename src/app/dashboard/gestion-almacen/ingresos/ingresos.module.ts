import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { IngresosRoutingModule } from './ingresos-routing.module';
import { ListarIngresosComponent } from './listar-ingresos/listar-ingresos.component';
import { CrearIngresosComponent } from './crear-ingresos/crear-ingresos.component';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { WebMaterialModule } from 'app/webmaterial.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import { FiltersComponent } from '@shared/components/filters/filters.component';


@NgModule({
  declarations: [
    ListarIngresosComponent,
    CrearIngresosComponent
  ],
  imports: [
    CommonModule,
    IngresosRoutingModule,
    BreadcrumbComponent,
    WebMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FiltersComponent
  ],
  providers:[
    DatePipe
  ]
})
export class IngresosModule { }
