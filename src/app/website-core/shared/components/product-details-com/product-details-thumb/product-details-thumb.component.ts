import { UtilsService } from '../../../../shared/services/utils.service';
import { Component, Input } from '@angular/core';
import { IProducto } from '../../../types/product-type';
import { ProductService } from 'app/website-core/shared/services/product.service';
import { environment } from 'environments/environment';
@Component({
  selector: 'app-product-details-thumb',
  templateUrl: './product-details-thumb.component.html',
  styleUrls: ['./product-details-thumb.component.scss'],
})
export class ProductDetailsThumbComponent {
  @Input() product!: IProducto;
   url = environment.imgUrl;

  constructor(
    public productService: ProductService,
    public utilsService: UtilsService
  ) {}

  ngOnInit() {
    if (this.product) {
      this.productService.activeImg = this.product.img_url;
    }
  }
}
