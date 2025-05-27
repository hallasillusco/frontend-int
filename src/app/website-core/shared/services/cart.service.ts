import { Injectable } from '@angular/core';
import { IProduct, IProducto } from '../types/product-type';
import Swal from 'sweetalert2';

const state = {
  cart_products: JSON.parse(localStorage['cart_products'] || '[]')
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public orderQuantity: number = 1;
  public isCartOpen: boolean = false;
  constructor() { }

  public getCartProducts(): IProducto[] {
    return state.cart_products;
  }

  handleOpenCartSidebar () {
    this.isCartOpen = !this.isCartOpen
  }

  // add_cart_product
  addCartProduct(payload: IProducto) {
    const isExist = state.cart_products.some((i: IProducto) => i.id === payload.id);
    if (payload.stock == 0) {
      Swal.fire({
        position: "top-end",
        iconColor:'error',
        text: `Agotado${payload.nombre}`,
        showConfirmButton: false,
        timer: 1500
      });
      // this.toastrService.error(`Agotado ${payload.nombre}`);
    }
    else if (!isExist) {
      const newItem = {
        ...payload,
        orderQuantity: 1,
      };
      state.cart_products.push(newItem);
      Swal.fire({
        position: "top-end",
        text: `${payload.nombre} agregado al carrito`,
        iconColor:'success',
        showConfirmButton: false,
        timer: 1500
      });
      // this.toastrService.success(`${payload.text} added to cart`);
    } else {
      state.cart_products.map((item: IProducto) => {
        if (item.id === payload.id) {
          if (typeof item.orderQuantity !== "undefined") {
            if (item.stock >= item.orderQuantity + this.orderQuantity) {
              item.orderQuantity =
                this.orderQuantity !== 1
                  ? this.orderQuantity + item.orderQuantity
                  : item.orderQuantity + 1;
                  Swal.fire({
                    position: "top-end",
                    text: `${this.orderQuantity} ${payload.nombre} agregado al carrito`,
                    iconColor:'success',
                    showConfirmButton: false,
                    timer: 1500
                  });
              // this.toastrService.success(`${this.orderQuantity} ${item.text} added to cart`);
            } else {
              Swal.fire({
                position: "top-end",
                text: `¡No hay más cantidad disponible para este producto!`,
                iconColor:'warning',
                showConfirmButton: false,
                timer: 1500
              });
              // this.toastrService.success(`No more quantity available for this product!`);
              this.orderQuantity = 1;
            }
          }
        }
        return { ...item };
      });
    }
    localStorage.setItem("cart_products", JSON.stringify(state.cart_products));
  };

// total price quantity
  public totalPriceQuantity() {
    return state.cart_products.reduce(
      (cartTotal: { total: number; quantity: number }, cartItem: IProducto) => {
        const { precio_unit, precio_desc, orderQuantity, descuento } = cartItem;
        if (typeof orderQuantity !== "undefined") {
          if (descuento && descuento > 0) {
            // Calculate the item total with discount
            const itemTotal = precio_desc * orderQuantity;
            cartTotal.total += itemTotal;
          } else {
            // Calculate the item total without discount
            const itemTotal = precio_unit * orderQuantity;
            cartTotal.total += itemTotal;
          }
          cartTotal.quantity += orderQuantity;
        }
        return cartTotal;
      },
      {
        total: 0,
        quantity: 0,
      }
    );
  };


  // quantity increment
  increment() {
    return this.orderQuantity = this.orderQuantity + 1;
  }

  // quantity decrement
  decrement() {
    return this.orderQuantity =
      this.orderQuantity > 1
        ? this.orderQuantity - 1
        : this.orderQuantity = 1;
  }

  // quantityDecrement
  quantityDecrement(payload: IProduct) {
    state.cart_products.map((item: IProduct) => {
      if (item.id === payload.id) {
        if (typeof item.orderQuantity !== "undefined") {
          if (item.orderQuantity > 1) {
            item.orderQuantity = item.orderQuantity - 1;
            // this.toastrService.info(`Decrement Quantity For ${item.title}`);
          }
        }
      }
      return { ...item };
    });
    localStorage.setItem("cart_products", JSON.stringify(state.cart_products));
  };

  // remover_cart_products
  removeCartProduct(payload: IProduct) {
    state.cart_products = state.cart_products.filter(
      (p: IProduct) => p.id !== payload.id
    );
    // this.toastrService.error(`${payload.title} remove to cart`);
    localStorage.setItem("cart_products", JSON.stringify(state.cart_products));
  };

  // clear cart
  clear_cart() {
    const confirmMsg = window.confirm(
      "Are you sure deleted your all cart items ?"
    );
    if (confirmMsg) {
      state.cart_products = [];
    }
    localStorage.setItem("cart_products", JSON.stringify(state.cart_products));
  };

  clear_cart_prueba(){
    state.cart_products = [];
    localStorage.setItem("cart_products", JSON.stringify(state.cart_products));
  }

  // initialOrderQuantity
  initialOrderQuantity() {
    return this.orderQuantity = 1;
  };
}
