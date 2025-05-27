import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { WebMaterialModule } from 'app/webmaterial.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProformasRoutingModule } from '../proformas/proformas-routing.module';
import { CrearProformasComponent } from './crear-proformas/crear-proformas.component';
import { ListaProformasComponent } from './lista-proformas/lista-proformas.component';
import { ComprobantePagoComponent } from './comprobante-pago/comprobante-pago.component';
import { FiltersComponent } from '@shared/components/filters/filters.component';




@NgModule({
  declarations: [
    ListaProformasComponent,
    CrearProformasComponent,
    ComprobantePagoComponent

  ],
  imports: [
    CommonModule,
    ProformasRoutingModule,
    WebMaterialModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    BreadcrumbComponent,
    FiltersComponent
  ],
  providers:[
    DatePipe
  ]
})
export class VentasModule { }
