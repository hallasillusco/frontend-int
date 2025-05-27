import { Component } from '@angular/core';
import { ProductService } from '../../../../shared/services/product.service';
import { IProducto } from '../../../../shared/types/product-type';
import { WebsiteService } from '@core/service/website.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-top-rated-products',
  templateUrl: './top-rated-products.component.html',
  styleUrls: ['./top-rated-products.component.scss']
})
export class TopRatedProductsComponent {

  public topRatedProducts!: IProducto
  url = environment.imgUrl;
  moneda = environment.moneda;

  constructor(public productService: ProductService,
    private basicService: WebsiteService
    ) {

      this.basicService.getTopProductos().subscribe(data=>{
        this.topRatedProducts = data
      })

    // this.productService.products.subscribe((products) => {
    //  this.topRatedProducts = products.map((product) => {
    //   if (product.reviews && product.reviews.length > 0) {
    //     const totalRating = product.reviews.reduce(
    //       (sum, review) => sum + review.rating,
    //       0
    //     );
    //     const averageRating = totalRating / product.reviews.length;

    //     return {
    //       product,
    //       rating: parseFloat(averageRating.toFixed(1)),
    //     };
    //   }
    //   return undefined; // Return undefined for products with no reviews
    // })
    // .filter(
    //   (product): product is { product: IProduct; rating: number } =>
    //     product !== undefined
    // ).slice()
    // .sort((a, b) => b.rating - a.rating)
    // .slice(0, 4);
    // });
  }

}
