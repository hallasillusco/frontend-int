import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guard/auth.guard';
import { ListarAyudaComponent } from './listar-ayuda/listar-ayuda.component';


const routes: Routes = [
  {
    path: 'listar',
    canActivate: [AuthGuard],
    component: ListarAyudaComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AyudaRoutingModule { }
