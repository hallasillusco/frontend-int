import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebsiteService } from '@core/service/website.service';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss']
})
export class BlogDetailsComponent {
  public blog :any;
  id: any;
  blogs: any;

  constructor(
    private webService: WebsiteService,
    public route: ActivatedRoute,
  ) {
    this.route.paramMap
    .subscribe((paramMap: any) => {        
      this.id = paramMap.get('id');
      this.getById();
    })
  }

  getById() {
    this.webService.getTiposBlogId(this.id).subscribe(data=>{
      this.blog = data.blog;
      this.blogs = data.blogs;
    })
  }

}
