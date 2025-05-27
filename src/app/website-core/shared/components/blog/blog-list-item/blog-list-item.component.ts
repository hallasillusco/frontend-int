import { Component,Input } from '@angular/core';
import { IBlogType } from '../../../types/blog-type';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-blog-list-item',
  templateUrl: './blog-list-item.component.html',
  styleUrls: ['./blog-list-item.component.scss']
})
export class BlogListItemComponent {
  url = environment.imgUrl;
  @Input () blog:any;

  constructor(
    private sanitizer: DomSanitizer    

  ) {
    
  }

  public createTrustedHtml(blogContent: string) {
    return this.sanitizer.bypassSecurityTrustHtml(blogContent);
 }
}
