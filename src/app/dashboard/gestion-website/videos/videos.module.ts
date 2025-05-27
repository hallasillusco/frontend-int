import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideosRoutingModule } from './videos-routing.module';
import { ListaVideosComponent } from './lista-videos/lista-videos.component';
import { CrearVideosComponent } from './crear-videos/crear-videos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { FileUploadComponent } from '@shared/components/file-upload/file-upload.component';
import { WebMaterialModule } from 'app/webmaterial.module';


@NgModule({
  declarations: [
    ListaVideosComponent,
    CrearVideosComponent
  ],
  imports: [
    CommonModule,
    VideosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    WebMaterialModule,
    BreadcrumbComponent,
    FileUploadComponent,
  ]
})
export class VideosModule { }
