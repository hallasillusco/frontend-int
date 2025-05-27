import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { WebMaterialModule } from 'app/webmaterial.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UnidadRoutingModule } from './ventas-routing.module';
import { ListaVentasComponent } from './lista-ventas/lista-ventas.component';
import { CrearVentasComponent } from './crear-ventas/crear-ventas.component';
import { ImprimirPdfComponent } from '@shared/components/imprimir-pdf/imprimir-pdf.component';
import { FiltersComponent } from '@shared/components/filters/filters.component';



@NgModule({
  declarations: [
    ListaVentasComponent,
    CrearVentasComponent
  ],
  imports: [
    CommonModule,
    UnidadRoutingModule,
    WebMaterialModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    BreadcrumbComponent,
    ImprimirPdfComponent,
    FiltersComponent
  ],
  providers:[
    DatePipe,
  ]
})
export class VentasModule { }




