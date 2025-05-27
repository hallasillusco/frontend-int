import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guard/auth.guard';
import { ListarCategoriasComponent } from './listar-categorias/listar-categorias.component';


const routes: Routes = [
  {
    path: '',
    component:ListarCategoriasComponent,
    canActivate:[AuthGuard]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriasRoutingModule { }
