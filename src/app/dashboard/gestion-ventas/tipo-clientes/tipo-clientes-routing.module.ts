import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guard/auth.guard';
import { ListarTipoClienteComponent } from './listar-tipo-cliente/listar-tipo-cliente.component';

const routes: Routes = [
  {
    path:'',
    canActivate: [AuthGuard],
    component:ListarTipoClienteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipoClientesRoutingModule  { }
