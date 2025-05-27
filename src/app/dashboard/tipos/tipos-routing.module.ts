import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaTiposComponent } from './lista-tipos/lista-tipos.component';
import { AuthGuard } from '@core/guard/auth.guard';

const routes: Routes = [
  {
    path:'',
    component:ListaTiposComponent,
    canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TiposRoutingModule { }
