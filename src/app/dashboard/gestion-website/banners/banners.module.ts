import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { WebMaterialModule } from 'app/webmaterial.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BannersRoutingModule } from '../banners/banners-routing.module';
import { CrearBannersComponent } from './crear-banners/crear-banners.component';
import { ListarBannersComponent } from './listar-banners/listar-banners.component';
import { FileUploadComponent } from '@shared/components/file-upload/file-upload.component';


@NgModule({
  declarations: [
    ListarBannersComponent,
    CrearBannersComponent
  ],
  imports: [
    CommonModule,
    BannersRoutingModule,
    WebMaterialModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    BreadcrumbComponent,
    FileUploadComponent
  ],
  providers: [
    DatePipe
  ]
})
export class BannersModule { }
