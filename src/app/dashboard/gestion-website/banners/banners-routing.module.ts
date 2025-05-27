import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guard/auth.guard';
import { ListarBannersComponent } from './listar-banners/listar-banners.component';
import { CrearBannersComponent } from './crear-banners/crear-banners.component';

const routes: Routes = [
  {
    path: 'listar',
    canActivate: [AuthGuard],
    component: ListarBannersComponent
  },
  {
    path: 'crear',
    canActivate: [AuthGuard],
    component: CrearBannersComponent
  },
  {
    path: 'editar/:id',
    canActivate: [AuthGuard],
    component: CrearBannersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BannersRoutingModule { }
