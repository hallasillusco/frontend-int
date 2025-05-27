import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnidadRoutingModule } from './Unidad-routing.module';
import { WebMaterialModule } from 'app/webmaterial.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { ListaUnidadComponent } from './lista-unidad/lista-unidad.component';
import { CrearUnidadComponent } from './crear-unidad/crear-unidad.component';



@NgModule({
  declarations: [
    ListaUnidadComponent,
    CrearUnidadComponent
  ],
  imports: [
    CommonModule,
    UnidadRoutingModule,
    WebMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BreadcrumbComponent
  ],
})
export class UnidadModule { }
