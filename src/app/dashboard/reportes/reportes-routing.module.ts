import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guard/auth.guard';
import { ExistenciasComponent } from './existencias/existencias.component';
import { VentasComponent } from './ventas/ventas.component';


const routes: Routes = [
  {
    path: 'existencias',
    component:ExistenciasComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'reporte-ventas',
    component:VentasComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportesRoutingModule { }
