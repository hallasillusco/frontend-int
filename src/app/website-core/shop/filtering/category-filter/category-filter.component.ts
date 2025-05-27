import { Component, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import category_data from '../../../shared/data/category-data';
import { ICategory } from '../../../shared/types/category-type';
import { ProductService } from '../../../shared/services/product.service';
import { ICategoria } from 'app/website-core/shared/types/product-type';
import { WebsiteService } from '@core/service/website.service';

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.scss'],
})
export class CategoryFilterComponent {
  public categoryData!: ICategoria[];
  activeQuery: any = 0;
  activeQuery1: any =0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private viewScroller: ViewportScroller,
    public productService: ProductService,
    private basicService: WebsiteService,
    private renderer: Renderer2,

  ) {
    this.listaCategoria();
  }

  listaCategoria() {
    this.basicService.getCategorias().subscribe(data=>{
      this.categoryData = data;
    })
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParams) => {
      this.activeQuery = queryParams['sub_categoria_id'];
      this.activeQuery1 = queryParams['categoria_id'];
      
    });
  }

  visibleIndex = -1;
  showSubItem(ind:any, categoria_id:any) {
    const queryParams: Params = {
      categoria_id: categoria_id,
    };
    this.router
    .navigate([], {
      relativeTo: this.route,
      queryParams, // Pass the queryParams object here
      queryParamsHandling: 'merge',
      skipLocationChange: false,
    })
    .finally(() => {
      this.viewScroller.setOffset([120, 120]);
      this.viewScroller.scrollToAnchor('products'); // Anchore Link
    });
    
    if (this.visibleIndex === ind) {
      this.visibleIndex = -1;
    } else {
      this.visibleIndex = ind;
    }
  }
  
  handleCategoryRoute(value: any): void {
    const newCategory = value;

    // Define the query parameters as an object
    const queryParams: Params = {
      sub_categoria_id: newCategory,
    };

    this.router
      .navigate([], {
        relativeTo: this.route,
        queryParams, // Pass the queryParams object here
        queryParamsHandling: 'merge',
        skipLocationChange: false,
      })
      .finally(() => {
        this.viewScroller.setOffset([120, 120]);
        this.viewScroller.scrollToAnchor('products'); // Anchore Link
      });
  }
}
