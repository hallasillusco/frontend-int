import { Component, Input } from '@angular/core';
import { IProduct } from '../../../../shared/types/product-type';
import { CartService } from '../../../../shared/services/cart.service';
import { WishlistService } from '../../../../shared/services/wishlist.service';
import { UtilsService } from '../../../../shared/services/utils.service';

@Component({
  selector: 'app-product-item-four',
  templateUrl: './product-item-four.component.html',
  styleUrls: ['./product-item-four.component.scss']
})
export class ProductItemFourComponent {
  @Input() product!: IProduct;

  constructor(
    public cartService: CartService,
    public wishlistService: WishlistService,
    public utilsService: UtilsService,
  ) {}
  // Agregar al carro
  addToCart(product: IProduct) {
    // this.cartService.addCartProduct(product);
  }
  // Agregar al carro
  addToWishlist(product: IProduct) {
    this.wishlistService.add_wishlist_product(product);
  }

  // Function to check if an item is in the cart
  isItemInCart(item: IProduct): boolean {
    return false;

    // return this.cartService.getCartProducts().some((prd: IProduct) => prd.id === item.id);
  }
  isItemInWishlist(item: IProduct): boolean {
    return this.wishlistService.getWishlistProducts().some((prd: IProduct) => prd.id === item.id);
  }
  productStatus(product: IProduct): boolean {
    return product.status === 'out-of-stock' || product.quantity === 0;
  }
}
