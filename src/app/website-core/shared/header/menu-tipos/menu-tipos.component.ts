import { Component } from '@angular/core';
import { WebsiteService } from '@core/service/website.service';
import { IMarca, ITipos } from '../../types/product-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-tipos',
  templateUrl: './menu-tipos.component.html',
  styleUrl: './menu-tipos.component.scss'
})
export class MenuTiposComponent {

  tipos!: ITipos;
  marcas!: IMarca;
  constructor(
    private basicService: WebsiteService,
    private router: Router,

  ) {
    this.listaTipos();
    this.listaMarcas();
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
