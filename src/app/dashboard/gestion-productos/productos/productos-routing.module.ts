import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaProductosComponent } from './lista-productos/lista-productos.component';
import { CrearProductosComponent } from './crear-productos/crear-productos.component';
import { AuthGuard } from '@core/guard/auth.guard';

const routes: Routes = [
  {
    path: 'listar',
    component: ListaProductosComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'crear',
    component: CrearProductosComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'editar/:id',
    component: CrearProductosComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductosRoutingModule { }
