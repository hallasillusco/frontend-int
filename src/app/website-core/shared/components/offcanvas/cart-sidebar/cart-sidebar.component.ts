import { Component } from '@angular/core';
import { CartService } from '../../../../shared/services/cart.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-cart-sidebar',
  templateUrl: './cart-sidebar.component.html',
  styleUrls: ['./cart-sidebar.component.scss']
})
export class CartSidebarComponent {

  url = environment.imgUrl;
  
  constructor(public cartService:CartService){}
}
