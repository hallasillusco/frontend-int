import { Component } from '@angular/core';
import Swiper from 'swiper';
import { Navigation, Pagination,EffectFade } from 'swiper/modules';

@Component({
  selector: 'app-hero-banner-two',
  templateUrl: './hero-banner-two.component.html',
  styleUrls: ['./hero-banner-two.component.scss']
})
export class HeroBannerTwoComponent  {
  public slider_data = [
    {
      id: 1,
      subtitle: "New Arrivals 2023",
      title: "The Clothing Collection",
      img: "/assets/website/img/banner/6/1.jpg",
      art_studio1: true,
    },
    {
      id: 2,
      subtitle: "Best Selling 2023",
      title: "The Summer Collection",
      img: "/assets/website/img/banner/6/2.jpg",
      art_studio2: true,
    },
    {
      id: 3,
      subtitle: "Winter Has Arrived",
      title: "Amazing New designs",
      img: "/assets/website/img/banner/6/3.jpg",
      art_studio3: true,
    },
  ];

  ngOnInit(): void {
    new Swiper('.tp-slider-active-2', {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: false,
      effect: 'fade',
      modules: [Navigation, Pagination,EffectFade],
      navigation: {
        nextEl: ".tp-slider-2-button-next",
        prevEl: ".tp-slider-2-button-prev",
      },
      pagination: {
        el: ".tp-slider-2-dot",
        clickable: true
      },
    });
  }
}
