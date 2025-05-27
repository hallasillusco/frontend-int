import { Component, ElementRef, ViewChild, Input } from '@angular/core';
import { BannerService } from '@core';
import { WebsiteService } from '@core/service/website.service';
import { environment } from 'environments/environment';
import Swiper from 'swiper';
import { Navigation, Pagination,EffectFade } from 'swiper/modules';


@Component({
  selector: 'app-hero-banner-one',
  templateUrl: './hero-banner-one.component.html',
  styleUrls: ['./hero-banner-one.component.scss']
})
export class HeroBannerOneComponent {

  @ViewChild('swiperContainer') swiperContainer!: ElementRef;
  public swiperInstance: Swiper | undefined;
  public swiperIndex: number = 0;

  public HomeSliderData = [
    {
      id: 1,
      pre_title: { text: "Starting at", price: 274 },
      title: "Acuarelas",
      subtitle: {
        text_1: "Acuarelas que saltan del papel, arte líquido para emociones vivas.",
        percent: 35,
        text_2: "off this week",
      },
      img: "/assets/website/img/slider/slider-img-1.png",
      art_studio1: true,
    },
    {
      id: 2,
      pre_title: { text: "Starting at", price: 999 },
      title: "Set de Colores",
      subtitle: {
        text_1: "48 colores combinacinarte-Grado agua soluble colo lapiz",
        percent: 10,
        text_2: "off this week",
      },
      img: "/assets/website/img/slider/slider-img-2.png",
      art_studio2: true,
    },
    {
      id: 3,
      pre_title: { text: "Starting at", price: 999 },
      title: "Marcadores Posca",
      subtitle: {
        text_1: "Explosión cromática: marcadores que transforman ideas en obras vibrantes",
        percent: 10,
        text_2: "off this week",
      },
      img: "/assets/website/img/slider/slider-img-3.png",
      art_studio3: true,
    },
    {
      id: 4,
      pre_title: { text: "Starting at", price: 999 },
      title: "Carboncillo Derwent",
      subtitle: {
        text_1: "Ideales para trabajos enormes, expande tus ideas en carboncillo hasta el limite y crear sin limite",
        percent: 10,
        text_2: "off this week",
      },
      img: "/assets/website/img/slider/slider-img-2.png",
      art_studio4: true,
    },
  ];
  banner: any;
  url = environment.imgUrl
  constructor(
    private bannerService: WebsiteService
  ) {
    this.listaBanner();
  }


  listaBanner() {
    this.bannerService.getBanners().subscribe(data=>{
      this.banner = data;
    })
  }

  ngAfterViewInit() {
    if (this.swiperContainer) {
      this.swiperInstance = new Swiper('.tp-slider-active', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: false,
        effect : 'fade',
        modules:[EffectFade,Pagination],
        pagination: {
          el: ".tp-slider-dot",
          clickable: true
        },
        on: {
          slideChange: () => {
            this.swiperIndex = this.swiperInstance?.realIndex || 0;
          }
        }
      })
    }
  }
}
