import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProducto } from '../../../shared/types/product-type';
import { ProductService } from '../../../shared/services/product.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { WebsiteService } from '@core/service/website.service';

@Component({
  selector: 'app-dynamic-product-details',
  templateUrl: './dynamic-product-details.component.html',
  styleUrls: ['./dynamic-product-details.component.scss']
})
export class DynamicProductDetailsComponent implements OnInit {
  public product!: IProducto;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private basicService: WebsiteService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap(params => {
        const productId = params.get('id');
        if (productId) {
          return this.basicService.getDetalleProductos(productId);
        }
        return of<IProducto | null>(null); // Emit null if there's no productId
      })
    ).subscribe((product: IProducto) => {
      if (!product) {
        this.router.navigate(['/404']);
      } else {
        this.product = product;
        console.log(this.product);
        
      }
    });
  }

  // getById(id:any) {
  //   this.basicService.getDetalleProductos(id).subscribe(data=>{
  //     this.product = data;
  //   })
  // }
}
