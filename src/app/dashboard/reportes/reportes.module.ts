import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { WebMaterialModule } from 'app/webmaterial.module';
import { ReportesRoutingModule } from './reportes-routing.module';
import { ExistenciasComponent } from './existencias/existencias.component';
import { VentasComponent } from './ventas/ventas.component';
import { FiltersComponent } from '@shared/components/filters/filters.component';


@NgModule({
  declarations: [
    ExistenciasComponent,
    VentasComponent
  ],
  imports: [
    CommonModule,
    ReportesRoutingModule,
    BreadcrumbComponent,
    MatTooltipModule,
    WebMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FiltersComponent
  ]
})
export class ReportesModule { }
