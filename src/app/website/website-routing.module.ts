import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { AboutComponent } from './about/about.component';
import { EventosComponent } from './eventos/eventos.component';
import { VideosComponent } from './videos/videos.component';
import { ContactoComponent } from './contacto/contacto.component';
import { ShopComponent } from './shop/shop.component';
import { AyudaComponent } from './ayuda/ayuda.component';
import { CouponComponent } from './coupon/coupon.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { VerficacionPedidoComponent } from './verficacion-pedido/verficacion-pedido.component';

const routes: Routes = [
  {
    path:'home',
    component: InicioComponent
  },
  {
    path:'about',
    component: AboutComponent
  },
  {
    path:'eventos/:id',
    component: EventosComponent
  },
  {
    path:'blog/:id',
    component: EventosComponent
  },
  {
    path:'blog-details/:id',
    component: BlogDetailsComponent
  },
  {
    path:'videos',
    component: VideosComponent
  },
  {
    path:'contacto',
    component: ContactoComponent
  },
  {
    path:'shop',
    component: ShopComponent
  },
  {
    path:'help/:id',
    component: AyudaComponent
  },
  {
    path:'gift-card',
    component: CouponComponent
  },
  {
    path:'checkout',
    component: CheckoutComponent
  },
  {
    path:'pedido',
    component: VerficacionPedidoComponent
  }
//   {
//     path: 'shop',
//     loadChildren: () => import('../website-core/shop/shop.module').then(m => m.ShopModule)
// },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsiteRoutingModule { }
