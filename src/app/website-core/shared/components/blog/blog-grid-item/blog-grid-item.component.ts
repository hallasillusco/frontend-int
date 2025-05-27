import { Component,Input } from '@angular/core';
import { IBlogType } from '../../../types/blog-type';
import { environment } from 'environments/environment';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-blog-grid-item',
  templateUrl: './blog-grid-item.component.html',
  styleUrls: ['./blog-grid-item.component.scss']
})
export class BlogGridItemComponent {
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
