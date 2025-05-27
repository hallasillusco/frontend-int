import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarMarcasComponent } from './listar-marcas/listar-marcas.component';
import { CrearMarcasComponent } from './crear-marcas/crear-marcas.component';
import { WebMaterialModule } from 'app/webmaterial.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { MarcasRoutingModule } from './marcas-routing.module';



@NgModule({
  declarations: [
    ListarMarcasComponent,
    CrearMarcasComponent
  ],
  imports: [
    CommonModule,
    WebMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BreadcrumbComponent,
    MarcasRoutingModule
  ],
})
export class MarcasModule { }
