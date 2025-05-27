import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guard/auth.guard';
import { ListaVentasComponent } from './lista-ventas/lista-ventas.component';
import { CrearVentasComponent } from './crear-ventas/crear-ventas.component';

const routes: Routes = [
  {
    path: 'listar',
    canActivate: [AuthGuard],
    component: ListaVentasComponent
  },
  {
    path: 'crear',
    component: CrearVentasComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnidadRoutingModule { }
