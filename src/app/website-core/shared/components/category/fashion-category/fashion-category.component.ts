import { Component } from '@angular/core';
import category_data from "../../../data/category-data";
import { Router } from '@angular/router';

@Component({
  selector: 'app-fashion-category',
  templateUrl: './fashion-category.component.html',
  styleUrls: ['./fashion-category.component.scss']
})
export class FashionCategoryComponent {
  categoryItems = category_data.filter((c) => c.productType === "fashion");

  constructor(private router: Router) {}

  handleParentCategory(status:string ) {
      if (status == 'descuento') {
        this.router.navigate(['/website/shop'], { queryParams: { descuento: true } });
      }else{
        if (status == 'nuevo') {
        this.router.navigate(['/website/shop'], { queryParams: { nuevo: true } });        
        }
        else{
          if (status == 'gift') {
            //  this.router.navigate(['/website/gift-card']);        
             this.router.navigate(['/website/home']);        
            
          }
        }
      }
    // const newCategory = value.toLowerCase().replace("&", "").split(" ").join("-");
  }
}
