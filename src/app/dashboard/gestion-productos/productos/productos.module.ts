import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaProductosComponent } from './lista-productos/lista-productos.component';
import { CrearProductosComponent } from './crear-productos/crear-productos.component';

import { ProductosRoutingModule } from './productos-routing.module';
import { WebMaterialModule } from 'app/webmaterial.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { FileUploadComponent } from '@shared/components/file-upload/file-upload.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ColoresComponent } from './colores/colores.component';



@NgModule({
  declarations: [
    ListaProductosComponent,
    CrearProductosComponent,
    ColoresComponent,
  ],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    WebMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BreadcrumbComponent,
    FileUploadComponent,
    CKEditorModule
  ]
})
export class ProductosModule { }
