import { Router } from '@angular/router';
import { Component, HostListener,Input } from '@angular/core';
import { CartService } from '../../../shared/services/cart.service';
import { WishlistService } from '../../../shared/services/wishlist.service';
import { UtilsService } from '../../../shared/services/utils.service';
import { WebsiteService } from '@core/service/website.service';

@Component({
  selector: 'app-header-two',
  templateUrl: './header-two.component.html',
  styleUrls: ['./header-two.component.scss'],
})
export class HeaderTwoComponent {
  @Input () style_2 : boolean = false;

  public searchText: string = '';
  public emailText: string = 'info@intecsa.com.bo';
  tipos: any;
  constructor(
    public cartService: CartService,
    public wishlistService: WishlistService,
    public utilsService: UtilsService,
    private router: Router,
    private basicService: WebsiteService
  ) {
    this.listaTipos();
  }

  listaTipos() {
    this.basicService.getTiposCategoria().subscribe(data=>{
      this.tipos = data;
    })
  }

  sticky : boolean = false;
  @HostListener('window:scroll',['$event']) onscroll () {
    if(window.scrollY > 80){
      this.sticky = true
    }
    else{
      this.sticky = false
    }
  }

  handleSearchSubmit() {
    const queryParams: { [key: string]: string | null } = {};
    if(!this.searchText){
      return
    }
    else {
      if (this.searchText) {
        queryParams['searchText'] = this.searchText;
      }
      this.router.navigate(['/pages/search'], { queryParams });
    }
  }
}
