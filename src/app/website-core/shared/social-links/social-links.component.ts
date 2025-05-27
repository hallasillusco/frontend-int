import { Component } from '@angular/core';

@Component({
  selector: 'app-social-links',
  templateUrl: './social-links.component.html',
  styleUrls: ['./social-links.component.scss']
})
export class SocialLinksComponent {

  public social_data = [
    {
      id:1,
      link:'href="https://www.instagram.com/artstudiosc/?igshid=16yh3dpxwqs2e"',
      icon:'fa-brands fa-facebook-f',
      title:'Facebook'
    },
    {
      id:2,
      link:'href="https://www.instagram.com/artstudiosc/?igshid=16yh3dpxwqs2e"',
      icon:'fa-brands fa-instagram',
      title:'Instagram'
    },
    // {
    //   id:3,
    //   link:'https://www.linkedin.com/',
    //   icon:'fa-brands fa-linkedin-in',
    //   title:'Linkedin'
    // },
    // {
    //   id:4,
    //   link:'https://vimeo.com/',
    //   icon:'fa-brands fa-vimeo-v',
    //   title:'Vimeo'
    // },
  ]
}
