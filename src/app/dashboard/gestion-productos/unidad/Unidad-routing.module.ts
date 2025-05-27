import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guard/auth.guard';
import { ListaUnidadComponent } from './lista-unidad/lista-unidad.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: ListaUnidadComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnidadRoutingModule { }
