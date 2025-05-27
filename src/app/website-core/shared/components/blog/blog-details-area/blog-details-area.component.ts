import { Component, Input } from '@angular/core';
import { IBlogType } from '../../../types/blog-type';
import { environment } from 'environments/environment';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-blog-details-area',
  templateUrl: './blog-details-area.component.html',
  styleUrls: ['./blog-details-area.component.scss']
})
export class BlogDetailsAreaComponent {
  @Input() blog: any
  @Input() blogs: any
  url = environment.imgUrl

  constructor(
    private sanitizer: DomSanitizer    

  ) {
    
  }

  public createTrustedHtml(blogContent: string) {
    return this.sanitizer.bypassSecurityTrustHtml(blogContent);
 }
}
