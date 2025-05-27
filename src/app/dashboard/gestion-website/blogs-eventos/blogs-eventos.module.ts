import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogsEventosRoutingModule } from './blogs-eventos-routing.module';
import { ListaBlogsComponent } from './lista-blogs/lista-blogs.component';
import { CrearBlogsComponent } from './crear-blogs/crear-blogs.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WebMaterialModule } from 'app/webmaterial.module';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { FileUploadComponent } from '@shared/components/file-upload/file-upload.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';


@NgModule({
  declarations: [
    ListaBlogsComponent,
    CrearBlogsComponent
  ],
  imports: [
    CommonModule,
    BlogsEventosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    WebMaterialModule,
    BreadcrumbComponent,
    FileUploadComponent,
    CKEditorModule

  ]
})
export class BlogsEventosModule { }
