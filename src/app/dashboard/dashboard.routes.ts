import { Route } from "@angular/router";
import { Page404Component } from "../authentication/page404/page404.component";
import { Dashboard1Component } from "./dashboard1/dashboard1.component";
import { Dashboard2Component } from "./dashboard2/dashboard2.component";
import { ConfiguracionComponent } from "./configuracion/configuracion.component";
import { MainComponent } from "./main/main.component";


export const DASHBOARD_ROUTE: Route[] = [
  {
    path: "",
    redirectTo: "main",
    pathMatch: "full",
  },
  {
    path: "main",
    component: MainComponent
  },
  {
    path: "dashboard1",
    component: Dashboard1Component,
  },
  {
    path: "dashboard2",
    component: Dashboard2Component,
  },
  {
    path: "configuracion",
    component: ConfiguracionComponent,
  },
  { path: 'usuarios',
    loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosModule)
  },

 {path: 'categorias',
 loadChildren: () => import('./gestion-productos/categorias/categorias.module').then(m=>m.CategoriasModule)
},

  { path: 'productos',
    loadChildren: () => import('./gestion-productos/productos/productos.module').then(m => m.ProductosModule)
  },

  { path: 'proveedores',
    loadChildren: () => import('./gestion-almacen/proveedores/proveedores.module').then(m => m.ProveedoresModule)
  },
  { path: 'ingresos',
    loadChildren: () => import('./gestion-almacen/ingresos/ingresos.module').then(m => m.IngresosModule)
  },
  {path: 'unidad',
    loadChildren:() => import('./gestion-productos/unidad/unidad.module').then(m=>m.UnidadModule)
  },
  {path: 'proformas',
    loadChildren:() => import('./gestion-ventas/proformas/proformas.module').then(m =>m.VentasModule)
  },
  {path: 'ventas',
    loadChildren:() => import('./gestion-ventas/ventas/ventas.module').then(m =>m.VentasModule)
  },
  {path: 'tipo-clientes',
  loadChildren:() => import('./gestion-ventas/tipo-clientes/tipo-clientes.module').then(m => m.TipoClientesModule)
},
  {path: 'clientes',
    loadChildren:() => import('./gestion-ventas/clientes/clientes.module').then(m => m.ClientesModule)
  },
  {
    path: 'banners',
    loadChildren:() => import('./gestion-website/banners/banners.module').then(m => m.BannersModule)
  },
  {
    path: 'ayuda',
    loadChildren:() => import('./gestion-website/ayuda/ayuda.module').then(m => m.AyudaModule)
  },
  {
    path: 'reportes',
    loadChildren: () => import('./reportes/reportes.module').then(m => m.ReportesModule)
  },
  {
    path: 'marcas',
    loadChildren: () => import('./marcas/marcas.module').then(m=>m.MarcasModule)
  },
  {
    path: 'tipos',
    loadChildren: () => import('./tipos/tipos.module').then(m=>m.TiposModule)
  },
  {
    path: 'sub-categoria',
    loadChildren: () => import('./sub-categorias/sub-categorias.module').then(m=>m.SubCategoriasModule)
  },
  {
    path: 'gestor',
    loadChildren: () => import('./gestion-website/blogs-eventos/blogs-eventos.module').then(m=>m.BlogsEventosModule)
  },
  {
    path: 'videos',
    loadChildren: () => import('./gestion-website/videos/videos.module').then(m=>m.VideosModule)
  },
  {
    path: 'accesos',
    loadChildren: () => import('./acceso/acceso.module').then(m=>m.AccesoModule)
  },
  { path: "**", component: Page404Component },
];

