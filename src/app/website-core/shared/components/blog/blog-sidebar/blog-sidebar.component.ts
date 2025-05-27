import { Component, Input } from '@angular/core';
import  blogData from '../../../data/blog-data';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-blog-sidebar',
  templateUrl: './blog-sidebar.component.html',
  styleUrls: ['./blog-sidebar.component.scss']
})
export class BlogSidebarComponent {
  public latest_blogs = blogData.slice(-3)
  @Input() blogs : any;
  @Input() id : any;
  url=environment.imgUrl
}
