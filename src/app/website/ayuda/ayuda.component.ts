import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { WebsiteService } from '@core/service/website.service';

@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.component.html',
  styleUrl: './ayuda.component.scss'
})
export class AyudaComponent {
  id: any;
  data: any;

  constructor(
    private webService: WebsiteService,
    public route: ActivatedRoute,
    private sanitizer: DomSanitizer    


  ) {
    this.route.paramMap
    .subscribe((paramMap: any) => {        
      this.id = paramMap.get('id');
      this.getById();
    })
    
  }

  getById() {
    this.webService.getInformacionesId(this.id).subscribe(data=>{
      this.data = data
    })
  }

  public createTrustedHtml(blogContent: string) {
    return this.sanitizer.bypassSecurityTrustHtml(blogContent);
 }
}
