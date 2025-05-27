import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebsiteRoutingModule } from './website-routing.module';
import { SharedModule } from 'app/website-core/shared/shared.module';
import { InicioComponent } from './inicio/inicio.component';
import { ShopModule } from 'app/website-core/shop/shop.module';
import { TranslateModule } from '@ngx-translate/core';
import { AboutComponent } from './about/about.component';
import { EventosComponent } from './eventos/eventos.component';
import { VideosComponent } from './videos/videos.component';
import { ContactoComponent } from './contacto/contacto.component';
import { ShopComponent } from './shop/shop.component';
import { DynamicProductDetailsComponent } from './dynamic-product-details/dynamic-product-details.component';
import { AyudaComponent } from './ayuda/ayuda.component';
import { CouponComponent } from './coupon/coupon.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormularioRegistroComponent } from './checkout/formulario-registro/formulario-registro.component';
import { FormularioBusquedaComponent } from './checkout/formulario-busqueda/formulario-busqueda.component';
import { VerficacionPedidoComponent } from './verficacion-pedido/verficacion-pedido.component';
import { FileUploadComponent } from '@shared/components/file-upload/file-upload.component';
import { BrowserModule } from '@angular/platform-browser';
import { ChatbotComponent } from './chatbot/chatbot.component';

@NgModule({
  declarations: [
    InicioComponent,
    AboutComponent,
    EventosComponent,
    BlogDetailsComponent,
    VideosComponent,
    ContactoComponent,
    ShopComponent,
    DynamicProductDetailsComponent,
    AyudaComponent,
    CouponComponent,
    CheckoutComponent,
    FormularioRegistroComponent,
    FormularioBusquedaComponent,
    VerficacionPedidoComponent,
    ChatbotComponent
  ],
  imports: [
    CommonModule,
    TranslateModule.forRoot({
      defaultLanguage: 'es'
  }),
    WebsiteRoutingModule,
    SharedModule,
    ShopModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadComponent
  ],
})
export class WebsiteModule { }
