import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarIngresosComponent } from './listar-ingresos/listar-ingresos.component';
import { AuthGuard } from '@core/guard/auth.guard';
import { CrearIngresosComponent } from './crear-ingresos/crear-ingresos.component';

const routes: Routes = [
  {
    path:'listar',
    component: ListarIngresosComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'crear',
    component: CrearIngresosComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'editar/:id',
    component: CrearIngresosComponent,
    canActivate:[AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IngresosRoutingModule { }
