import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaBlogsComponent } from './lista-blogs/lista-blogs.component';
import { AuthGuard } from '@core/guard/auth.guard';

const routes: Routes = [
  {
    path:'',
    component: ListaBlogsComponent,
    canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogsEventosRoutingModule { }
