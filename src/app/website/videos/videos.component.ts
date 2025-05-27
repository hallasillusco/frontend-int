import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WebsiteService } from '@core/service/website.service';
import blogData from 'app/website-core/shared/data/blog-data';
import { ProductService } from 'app/website-core/shared/services/product.service';
import { IBlogType } from 'app/website-core/shared/types/blog-type';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrl: './videos.component.scss'
})
export class VideosComponent {

  public blogs: any;
  videos: any;
  public pageNo: number = 1;
  public paginate: any = {};
  public startIndex: number = 0;
  public endIndex: number = 4;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public productService: ProductService,
    private webService: WebsiteService
  ) {}

  ngOnInit() {
    this.listaVideos();
    this.listaTipoBlog();
  }

  listaVideos() {
    this.webService.getVideos().subscribe(data=>{
      this.videos = data;
    })
  }

  handlePagination(event: any): void {
    const { data, start, end } = event;
    console.log('data', data, 'start', start, 'end', end);
    this.startIndex = start;
    this.endIndex = end;
  }

  listaTipoBlog() {
    this.webService.getTipoBlog(1).subscribe(data=>{
        this.blogs = data;
    })
  }
  
}
