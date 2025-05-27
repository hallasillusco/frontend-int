import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaSubcategoriaComponent } from './lista-subcategoria/lista-subcategoria.component';
import { AuthGuard } from '@core/guard/auth.guard';

const routes: Routes = [
  {
    path:'',
    component:ListaSubcategoriaComponent,
    canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubCategoriasRoutingModule { }
