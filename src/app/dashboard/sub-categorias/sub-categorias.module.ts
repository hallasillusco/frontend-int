import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubCategoriasRoutingModule } from './sub-categorias-routing.module';
import { ListaSubcategoriaComponent } from './lista-subcategoria/lista-subcategoria.component';
import { CrearSubcategoriaComponent } from './crear-subcategoria/crear-subcategoria.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { WebMaterialModule } from 'app/webmaterial.module';


@NgModule({
  declarations: [
    ListaSubcategoriaComponent,
    CrearSubcategoriaComponent
  ],
  imports: [
    CommonModule,
    SubCategoriasRoutingModule,
    WebMaterialModule,
    BreadcrumbComponent,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SubCategoriasModule { }
