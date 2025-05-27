import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProveedoresRoutingModule } from './proveedores-routing.module';
import { ListaProveedorComponent } from './lista-proveedor/lista-proveedor.component';
import { CrearProveedorComponent } from './crear-proveedor/crear-proveedor.component';
import { WebMaterialModule } from 'app/webmaterial.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';


@NgModule({
  declarations: [
    ListaProveedorComponent,
    CrearProveedorComponent
  ],
  imports: [
    CommonModule,
    ProveedoresRoutingModule,
    WebMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BreadcrumbComponent
  ]
})
export class ProveedoresModule { }
