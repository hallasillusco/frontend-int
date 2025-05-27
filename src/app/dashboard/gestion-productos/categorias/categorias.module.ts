import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriasRoutingModule} from './categorias-routing.module';
import { WebMaterialModule } from 'app/webmaterial.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { CrearCategoriasComponent } from './crear-categorias/crear-categorias.component';
import { ListarCategoriasComponent } from './listar-categorias/listar-categorias.component';


@NgModule({
  declarations: [
    ListarCategoriasComponent,
    CrearCategoriasComponent
  ],
  imports: [
    CommonModule,
    CategoriasRoutingModule,
    WebMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BreadcrumbComponent
  ],
})
export class CategoriasModule { }
