import { ChangeDetectorRef, Component } from '@angular/core';
import { ICategoria, IProducto } from '../../../../shared/types/product-type';
import { ProductService } from '../../../../shared/services/product.service';
import { WebsiteService } from '@core/service/website.service';

@Component({
  selector: 'app-fashion-all-products',
  templateUrl: './fashion-all-products.component.html',
  styleUrls: ['./fashion-all-products.component.scss'],
})
export class FashionAllProductsComponent {
  tabs!: ICategoria;
  activeTab: string = 'VER TODO';

  public allProducts:IProducto[] = [];

  constructor(private cdr: ChangeDetectorRef,public productService: ProductService,
      private basicService: WebsiteService
    ) {
      this.listaCategorias();
      this.listaProductos('');
  }


  listaCategorias() {
    this.basicService.getCategoriasDestacados().subscribe(data=>{
      this.tabs = data;
      console.log(this.tabs);
      
    })
  }

  listaProductos(categoria_id:any) {
     this.basicService.getProductosDestacados({
      'categoria_id': categoria_id
     }).subscribe((products) => {
      this.allProducts = products
      // this.allProducts = products.filter((p:any) => p.productType === 'fashion');
      // this.filteredProducts = this.getFilteredProducts();
    });
  }

  handleActiveTab(tab: string): void {
    this.activeTab = tab;
    if (this.activeTab == 'VER TODO') {
      this.listaProductos('')
    }else{
      this.listaProductos(tab);
    }
    this.cdr.detectChanges();
  }
}
