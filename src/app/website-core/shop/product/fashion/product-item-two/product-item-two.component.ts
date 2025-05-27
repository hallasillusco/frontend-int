import { Component, Input } from '@angular/core';
import { CartService } from '../../../../shared/services/cart.service';
import { WishlistService } from '../../../../shared/services/wishlist.service';
import { IProducto } from '../../../../shared/types/product-type';
import { CompareService } from '../../../../shared/services/compare.service';
import { UtilsService } from '../../../../shared/services/utils.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-product-item-two',
  templateUrl: './product-item-two.component.html',
  styleUrls: ['./product-item-two.component.scss']
})
export class ProductItemTwoComponent {
  @Input() product!: IProducto;
  @Input() spacing: Boolean = true;
  @Input() offer_style: Boolean | undefined;
  url = environment.imgUrl;
  moneda = environment.moneda;

  constructor(
    public cartService: CartService,
    public utilsService: UtilsService,
  ) {}
  // add to cart
  addToCart(product: IProducto) {
    this.cartService.addCartProduct(product);
  }
  // Function to check if an item is in the cart
  isItemInCart(item: IProducto): boolean {
    // return true
    return this.cartService.getCartProducts().some((prd: IProducto) => prd.id === item.id);
  }
  isItemInWishlist(item: IProducto): boolean {
    return true

    // return this.wishlistService.getWishlistProducts().some((prd: IProducto) => prd.id === item.id);
  }
  isItemInCompare(item: IProducto): boolean {
    return true
    
    // return this.compareService.getCompareProducts().some((prd: IProducto) => prd.id === item.id);
  }
  productStatus(product: IProducto): boolean {
    return true
    
    // return product.status === 'out-of-stock' || product.quantity === 0;
  }
}
