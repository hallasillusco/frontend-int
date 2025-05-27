import { Injectable } from '@angular/core';
import { IProduct, IProducto } from '../types/product-type';


const state = {
  compare_items: JSON.parse(localStorage['compare_products'] || '[]')
}

@Injectable({
  providedIn: 'root'
})


export class CompareService {

  public getCompareProducts () {
    return state.compare_items;
  }

  constructor() { }

  // add_compare_product
  add_compare_product (payload: IProducto) {
    const isAdded = state.compare_items.findIndex((p: IProducto) => p.id === payload.id);
    if (isAdded !== -1) {
      state.compare_items = state.compare_items.filter((p: IProducto) => p.id !== payload.id);
      // this.toastrService.error(`${payload.title} remove to compare`);
    } else {
      state.compare_items.push(payload);
      // this.toastrService.success(`${payload.title} added to compare`);
    }
    localStorage.setItem("compare_products", JSON.stringify(state.compare_items));
  };
  // remove compare
  removeCompare(payload: IProducto) {
    state.compare_items = state.compare_items.filter((p: IProducto) => p.id !== payload.id);
    // this.toastrService.error(`${payload.title} remove to compare`);
    localStorage.setItem("compare_products", JSON.stringify(state.compare_items));
  };
}
