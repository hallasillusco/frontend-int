import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { ProductService } from '../../shared/services/product.service';
import { IProducto } from '../../shared/types/product-type';
import { WebsiteService } from '@core/service/website.service';

@Component({
  selector: 'app-shop-area',
  templateUrl: './shop-area.component.html',
  styleUrls: ['./shop-area.component.scss']
})
export class ShopAreaComponent {
  @Input() listStyle: boolean = false;
  @Input() full_width: boolean = false;
  @Input() shop_1600: boolean = false;
  @Input() shop_right_side: boolean = false;
  @Input() shop_no_side: boolean = false;

  public products: IProducto[] = [];
  public minPrice: number = 0;
  public maxPrice: number = this.productService.maxPrice;
  public niceSelectOptions = this.productService.filterSelect;
  public brands: string[] = [];
  public tags: string[] = [];
  public category: string | null = null;
  public subcategory: string | null = null;
  public status: string | null = null;
  public brand: string | null = null;
  public pageNo: number = 1;
  public pageSize: number = 9;
  public paginate: any = {}; // Pagination use only
  public sortBy: string = 'asc'; // Sorting Order
  public mobileSidebar: boolean = false;


  activeTab: string = this.listStyle ? 'list' : 'grid';
  handleActiveTab(tab: string) {
    this.activeTab = tab;
  }

  // shop changeFilterSelect
  changeFilterSelect(selectedOption: { value: string, text: string }) {
    this.sortByFilter(selectedOption.value)
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public productService: ProductService,
    private basicService: WebsiteService,
    private viewScroller: ViewportScroller,
  ) {

    // // Get Query params..
    // this.listaProductos('');
    this.route.queryParams.subscribe((params) => {
        this.pageNo = params['page'] ? params['page'] : this.pageNo;
        this.listaProductos({
          'sub_categoria_id':params['sub_categoria_id'], 
          'marca_id':params['marca_id'],
          'categoria_id':params['categoria_id'],
          'descuento': params['descuento'],
          'nuevo': params['nuevo'],
        })
    });
  }
  
  listaProductos(filter:any) {
    this.basicService.getProductos({
      'sub_categoria_id': filter.sub_categoria_id,
      'marca_id': filter.marca_id,
      'categoria_id': filter.categoria_id,
      'descuento': filter.descuento,
      'nuevo': filter.nuevo,
    }).subscribe(data=>{
      this.products = data;
      this.paginate = this.productService.getPager(this.products.length,Number(+this.pageNo),this.pageSize);
      this.products = this.products.slice(this.paginate.startIndex,this.paginate.endIndex + 1);
      
    })
  }
 
  ngOnInit() {
    this.activeTab = this.listStyle ? 'list' : 'grid';
  }

  // Append filter value to Url
  updateFilter(tags: any) {
    tags.page = null; // Reset Pagination
  }

  // SortBy Filter
  sortByFilter(value:string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { sortBy: value ? value : null},
      queryParamsHandling: 'merge', // preserve the existing query params in the route
      skipLocationChange: false  // do trigger navigation
    }).finally(() => {
      this.viewScroller.setOffset([120, 120]);
      this.viewScroller.scrollToAnchor('products'); // Anchore Link
    });
  }

  // product Pagination
  setPage(page: number) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: page },
      queryParamsHandling: 'merge', // preserve the existing query params in the route
      skipLocationChange: false  // do trigger navigation
    }).finally(() => {
      this.viewScroller.setOffset([120, 120]);
      this.viewScroller.scrollToAnchor('products'); // Anchore Link
    });
  }

  handleResetFilter () {
    this.minPrice = 0;
    this.maxPrice = this.productService.maxPrice;
    this.pageNo = 1;
    this.router.navigate(['/website/shop']);
  }

  handleFilterOffcanvas () {
    this.productService.filter_offcanvas = !this.productService.filter_offcanvas
  }

  handleFilterOffcanvasClick(event: MouseEvent) {
    // Prevent click event propagation to the overlay when clicking inside the offcanvas
    event.stopPropagation();
  }

}
