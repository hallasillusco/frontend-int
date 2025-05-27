import { Component,Input } from '@angular/core';
import { IProduct, IProducto } from '../../../../shared/types/product-type';
import { CartService } from '../../../../shared/services/cart.service';
import { CompareService } from '../../../../shared/services/compare.service';
import { WishlistService } from '../../../../shared/services/wishlist.service';
import { environment } from 'environments/environment';
import { UtilsService } from 'app/website-core/shared/services/utils.service';

@Component({
  selector: 'app-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.scss']
})
export class ProductListItemComponent {
  @Input () product! : IProducto;
  url = environment.imgUrl;
  moneda = environment.moneda;

  constructor(
    public cartService: CartService,
    public wishlistService: WishlistService,
    public compareService: CompareService,
    public utilsService: UtilsService,
  ) {}
  // Agregar al carro
  addToCart(product: IProducto) {
    this.cartService.addCartProduct(product);
  }
  // Agregar al carro
  addToWishlist(product: IProducto) {
    // this.wishlistService.add_wishlist_product(product);
  }
  // Agregar al carro
  addToCompare(product: IProducto) {
    this.compareService.add_compare_product(product);
  }

  // Function to check if an item is in the cart
  isItemInCart(item: IProducto): boolean {
    return this.cartService.getCartProducts().some((prd: IProducto) => prd.id === item.id);
  }
}
