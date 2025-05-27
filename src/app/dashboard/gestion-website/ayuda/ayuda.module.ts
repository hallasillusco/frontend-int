import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarAyudaComponent } from './listar-ayuda/listar-ayuda.component';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { WebMaterialModule } from 'app/webmaterial.module';
import { AyudaRoutingModule } from './ayuda-routing.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { CrearAyudaComponent } from './crear-ayuda/crear-ayuda.component';


@NgModule({
  declarations: [
    ListarAyudaComponent,
    CrearAyudaComponent

  ],
  imports: [
    CommonModule,
    BreadcrumbComponent,
    WebMaterialModule,
    AyudaRoutingModule,
    WebMaterialModule,
    CKEditorModule,
    ReactiveFormsModule
  ]
})
export class AyudaModule { }
