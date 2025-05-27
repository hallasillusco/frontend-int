import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearProveedorComponent } from './crear-proveedor/crear-proveedor.component';
import { ListaProveedorComponent } from './lista-proveedor/lista-proveedor.component';
import { AuthGuard } from '@core/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: ListaProveedorComponent
  },
  {
    path: 'crear',
    canActivate: [AuthGuard],
    component: CrearProveedorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProveedoresRoutingModule { }
