import { Component, Input } from '@angular/core';
import { IProduct, IProducto } from '../../../types/product-type';
import { CartService } from '../../../../shared/services/cart.service';
import { ProductService } from 'app/website-core/shared/services/product.service';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-details-wrapper',
  templateUrl: './product-details-wrapper.component.html',
  styleUrls: ['./product-details-wrapper.component.scss'],
})
export class ProductDetailsWrapperComponent {
  @Input() product!: IProducto;
  @Input() isShowBottom: boolean = true;
  url = environment.imgUrl;
  textMore = false;
  activeImg: string | undefined;
  moneda=environment.moneda;

  handleTextToggle() {
    this.textMore = !this.textMore;
  }

  constructor(
    public productService: ProductService,
    public cartService: CartService,
    private router: Router,
  ) {}

  // handleIsColorVariant(product: IProduct) {
  //   if (product.imageURLs.some((item) => item?.color && item?.color?.name)) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  add(){
    // this.cartService.addCartProduct(this.product);
    this.router.navigate(["/website/checkout"])
    
  }
  handleImageActive(img: string) {
    this.activeImg = img;
  }

  ngOnInit() {}
}
