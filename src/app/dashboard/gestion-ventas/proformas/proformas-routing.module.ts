import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guard/auth.guard';
import { ListaProformasComponent } from './lista-proformas/lista-proformas.component';
import { CrearProformasComponent } from './crear-proformas/crear-proformas.component';

const routes: Routes = [
  {
    path: 'listar',
    canActivate: [AuthGuard],
    component: ListaProformasComponent
  },
  {
    path: 'crear',
    canActivate: [AuthGuard],
    component: CrearProformasComponent
  },
  {
    path: 'editar/:id',
    canActivate: [AuthGuard],
    component: CrearProformasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProformasRoutingModule { }
