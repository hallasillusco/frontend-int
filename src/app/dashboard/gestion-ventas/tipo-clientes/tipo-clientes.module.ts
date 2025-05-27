import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarTipoClienteComponent } from './listar-tipo-cliente/listar-tipo-cliente.component';
import { CrearTipoClienteComponent } from './crear-tipo-cliente/crear-tipo-cliente.component';
import { WebMaterialModule } from 'app/webmaterial.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { TipoClientesRoutingModule } from './tipo-clientes-routing.module';



@NgModule({
  declarations: [
    ListarTipoClienteComponent,
    CrearTipoClienteComponent
  ],
  imports: [
    CommonModule,
    TipoClientesRoutingModule,
    WebMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BreadcrumbComponent
  ]
})
export class TipoClientesModule { }
