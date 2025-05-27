import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarAccesoComponent } from './listar-acceso/listar-acceso.component';
import { AuthGuard } from '@core/guard/auth.guard';

const routes: Routes = [
  {
    path:'',
    component:ListarAccesoComponent,
    canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccesoRoutingModule { }
