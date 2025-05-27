import { Component,Input, OnInit } from '@angular/core';
import { WebsiteService } from '@core/service/website.service';

@Component({
  selector: 'app-footer-one',
  templateUrl: './footer-one.component.html',
  styleUrls: ['./footer-one.component.scss']
})
export class FooterOneComponent implements OnInit {

  @Input () style_2 : Boolean = false;
  @Input () primary_style : Boolean = false;
  @Input () style_3 : Boolean = false;
  info: any;

  getYear () {
    return new Date().getFullYear();
  }
  constructor(
    private informacionService: WebsiteService,
  ) {}

  ngOnInit(): void {
    this.informacionService.getInformaciones().subscribe(informaciones => {
      this.info = informaciones
    });
  }
}
 