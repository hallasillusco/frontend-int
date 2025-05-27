import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WebsiteService } from '@core/service/website.service';
import blogData from 'app/website-core/shared/data/blog-data';
import { ProductService } from 'app/website-core/shared/services/product.service';
import { IBlogType } from 'app/website-core/shared/types/blog-type';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.scss'
})
export class EventosComponent implements OnInit {

  @Input() list_style : boolean = true;//
  public blogs: any = [];
  public startIndex: number = 0;
  public endIndex: number = 6;
  id: any;

  constructor(
    private webService: WebsiteService,
    public route: ActivatedRoute,
  ) {
    
  }

  ngOnInit() {
    this.route.paramMap
    .subscribe((paramMap: any) => {        
      this.id = paramMap.get('id');
      this.listaTipoBlog();
    })
    // this.blogs = blogData.filter((b) => b.blog === 'blog-grid');
  }

  listaTipoBlog() {
    this.webService.getTipoBlog(this.id).subscribe(data=>{
        this.blogs = data;
    })
  }

  handlePagination(event: any): void {
    const { data, start, end } = event;
    console.log('data', data, 'start', start, 'end', end);
    this.startIndex = start;
    this.endIndex = end;
  }
}
