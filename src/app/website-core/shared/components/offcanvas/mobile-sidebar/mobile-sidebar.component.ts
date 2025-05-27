import { Component,Input } from '@angular/core';
import {mobile_menu} from '../../../data/menu-data';
import { IMobileType } from '../../../types/menu-d-type';
import { UtilsService } from '../../../../shared/services/utils.service';
import category_data from "../../../data/category-data";
import { WebsiteService } from '@core/service/website.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mobile-sidebar',
  templateUrl: './mobile-sidebar.component.html',
  styleUrls: ['./mobile-sidebar.component.scss']
})
export class MobileSidebarComponent {

  @Input () product_type!:string;

  public mobile_menu: IMobileType[] = mobile_menu;
  public isCategoryActive:boolean = false;
  public openCategory:string = '';
  public openSubCategory:string = '';
  public isActiveMenu:string = '';
  public isToggleActive:string = '';
  marcas: any;
  tipos: any;

  filterCategories () {
    return category_data.filter(
      (c) => c.productType.toLowerCase() === this.product_type.toLowerCase()
    );
  }

  constructor(
    public utilsService:UtilsService,
    private basicService: WebsiteService,
    private router: Router,
  ) {
    this.listaMarcas();
    this.listaTipos();
  }

  listaMarcas() {
    this.basicService.getMarcas().subscribe(data=>{
      this.marcas = data;
    })
  }

  listaTipos() {
    this.basicService.getTiposCategoria().subscribe(data=>{
      this.tipos = data;
    })
  }


  toggleCategoryActive() {
    this.isCategoryActive = !this.isCategoryActive;
  }


  handleOpenSubMenu(title: string) {
    this.isActiveMenu = (this.isActiveMenu === title) ? '' : title;
  }

  handleOpenCategory (title: string)  {
    if (title === this.openCategory) {
      this.openCategory = "";
    } else {
      this.openCategory = title;
    }
  };

  handleOpenSubCategory (title: string)  {
    if (title === this.openSubCategory) {
      this.openSubCategory = "";
    } else {
      this.openSubCategory = title;
    }
  };

  handleToggleActive = (type: string) => {
    if (type === this.isToggleActive) {
      this.isToggleActive = "";
    } else {
      this.isToggleActive = type;
    }
  };

  handleSearchSubmit(categoria_id:any, sub_categoria_id:any) {
    const queryParams: { [key: string]: string | null } = {};
    if(categoria_id){
      queryParams['categoria_id'] = categoria_id ;
      this.router.navigate(['/website/shop'],{queryParams});
    }
    else {
      if (!categoria_id) {
        queryParams['sub_categoria_id'] = sub_categoria_id ;
      }
      this.router.navigate(['/website/shop'], { queryParams });
    }
  }

  handleSearchSubmitMarcas(marca_id:any){
    const queryParams: { [key: string]: string | null } = {};
    if (marca_id) {
      queryParams['marca_id'] = marca_id ;
      this.router.navigate(['/website/shop'],{queryParams});      
    }
  }

}
