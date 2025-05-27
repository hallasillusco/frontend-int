import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { IBrand } from '../../../shared/types/brand-type';
import brands_data from '../../../shared/data/brand-data';
import { ProductService } from '../../../shared/services/product.service';
import { WebsiteService } from '@core/service/website.service';
import { IMarca } from 'app/website-core/shared/types/product-type';

@Component({
  selector: 'app-brand-filter',
  templateUrl: './brand-filter.component.html',
  styleUrls: ['./brand-filter.component.scss'],
})
export class BrandFilterComponent {
  public brandsData!: IMarca;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private viewScroller: ViewportScroller,
    public productService: ProductService,
    private basicService: WebsiteService
  ) {
    this.listaMarcas()
  }

  listaMarcas() {
    this.basicService.getMarcas().subscribe(data=>{
      this.brandsData = data;
      
    })
  }

  handleBrandRoute(value: any) {
    const newBrand = value
    // Define the query parameters as an object
    const queryParams: Params = {
      marca_id: newBrand,
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
