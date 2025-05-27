import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarMarcasComponent } from './listar-marcas/listar-marcas.component';
import { AuthGuard } from '@core/guard/auth.guard';

const routes: Routes = [
  {
    path:'listar',
    component: ListarMarcasComponent,
    canActivate:[AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarcasRoutingModule { }
