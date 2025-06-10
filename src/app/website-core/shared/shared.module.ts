
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

// import { GraficoTableauComponent } from 'src/app/dashboard/grafico-tableau/grafico-tableau.component';
//import { GraficoComparativaComponent } from '../../dashboard/grafico-comparativa/grafico-comparativa.component';
import { GraficoTableauComponent } from '../../dashboard/grafico-tableau/grafico-tableau.component';

// Headers
import { HeaderOneComponent } from './header/header-one/header-one.component';
import { HeaderTwoComponent } from './header/header-two/header-two.component';
import { HeaderThreeComponent } from './header/header-three/header-three.component';
import { HeaderFourComponent } from './header/header-four/header-four.component';
import { HeaderSearchComponent } from './header/header-com/header-search/header-search.component';
import { MenuBarComponent } from './header/header-com/menu-bar/menu-bar.component';
import { HeaderCategoryComponent } from './header/header-com/header-category/header-category.component';
import { HeaderTopBarComponent } from './header/header-com/header-top-bar/header-top-bar.component';
import { MenuTiposComponent } from './header/menu-tipos/menu-tipos.component';

// UI
import { NiceSelectComponent } from './ui/nice-select/nice-select.component';
import { PaginationComponent } from './ui/pagination/pagination.component';
import { PaginationTwoComponent } from './ui/pagination-two/pagination-two.component';

// Footers
import { FooterOneComponent } from './footer/footer-one/footer-one.component';
import { FooterTwoComponent } from './footer/footer-two/footer-two.component';
import { SocialLinksComponent } from './social-links/social-links.component';

// Otros componentes (solo uno por tipo)
import { BlogSidebarComponent } from './components/blog/blog-sidebar/blog-sidebar.component';
import { BlogItemOneComponent } from './components/blog/electronic/blog-item-one/blog-item-one.component';
import { BlogItemTwoComponent } from './components/blog/fashion/blog-item-two/blog-item-two.component';
import { FashionBlogAreaComponent } from './components/blog/fashion/fashion-blog-area/fashion-blog-area.component';
import { ElectronicBlogAreaComponent } from './components/blog/electronic/electronic-blog-area/electronic-blog-area.component';
import { BlogDetailsAreaComponent } from './components/blog/blog-details-area/blog-details-area.component';
import { BlogGridItemComponent } from './components/blog/blog-grid-item/blog-grid-item.component';
import { BlogListItemComponent } from './components/blog/blog-list-item/blog-list-item.component';
import { BlogPostboxItemComponent } from './components/blog/blog-postbox-item/blog-postbox-item.component';

import { JewelryBannerComponent } from './components/banner/jewelry-banner/jewelry-banner.component';
import { ElectronicProductBannerComponent } from './components/banner/electronic-product-banner/electronic-product-banner.component';

import { BackToTopComponent } from './components/back-to-top/back-to-top.component';
import { BreadcrumbOneComponent } from './components/breadcrumb/breadcrumb-one/breadcrumb-one.component';
import { BreadcrumbTwoComponent } from './components/breadcrumb/breadcrumb-two/breadcrumb-two.component';
import { ShopDetailsBreadcrumbComponent } from './components/breadcrumb/shop-details-breadcrumb/shop-details-breadcrumb.component';

import { BeautyCategoryComponent } from './components/category/beauty-category/beauty-category.component';
import { ElectronicCategoryComponent } from './components/category/electronic-category/electronic-category.component';
import { FashionCategoryComponent } from './components/category/fashion-category/fashion-category.component';

import { FeatureOneComponent } from './components/feature/feature-one/feature-one.component';
import { FeatureTwoComponent } from './components/feature/feature-two/feature-two.component';

import { BlogReplyFormComponent } from './components/forms/blog-reply-form/blog-reply-form.component';
import { ContactFormComponent } from './components/forms/contact-form/contact-form.component';
import { LoginFormComponent } from './components/forms/login-form/login-form.component';
import { RegisterFormComponent } from './components/forms/register-form/register-form.component';
import { ShopDetailsFormComponent } from './components/forms/shop-details-form/shop-details-form.component';

import { HeroBannerOneComponent } from './components/hero-banner/hero-banner-one/hero-banner-one.component';
import { HeroBannerTwoComponent } from './components/hero-banner/hero-banner-two/hero-banner-two.component';
import { HeroBannerThreeComponent } from './components/hero-banner/hero-banner-three/hero-banner-three.component';
import { HeroBannerFourComponent } from './components/hero-banner/hero-banner-four/hero-banner-four.component';

import { InstagramAreaOneComponent } from './components/instagram/instagram-area-one/instagram-area-one.component';
import { InstagramAreaTwoComponent } from './components/instagram/instagram-area-two/instagram-area-two.component';

import { ProductModalComponent } from './components/modals/product-modal/product-modal.component';
import { VideoPopapComponent } from './components/modals/video-popap/video-popap.component';
import { CartSidebarComponent } from './components/offcanvas/cart-sidebar/cart-sidebar.component';
import { MobileSidebarComponent } from './components/offcanvas/mobile-sidebar/mobile-sidebar.component';

import { SocialLoginComponent } from './components/social-login/social-login.component';

import { BeautyTestimonialComponent } from './components/testimonial/beauty-testimonial/beauty-testimonial.component';
import { FashionTestimonialComponent } from './components/testimonial/fashion-testimonial/fashion-testimonial.component';

import { ProductDetailsRatingItemComponent } from './components/product-details-com/product-details-rating-item/product-details-rating-item.component';
import { ProductDetailsTabNavComponent } from './components/product-details-com/product-details-tab-nav/product-details-tab-nav.component';
import { ProductDetailsThumbComponent } from './components/product-details-com/product-details-thumb/product-details-thumb.component';
import { ProductDetailsWrapperComponent } from './components/product-details-com/product-details-wrapper/product-details-wrapper.component';

import { CountdownTimerComponent } from './components/countdown-timer/countdown-timer.component';

@NgModule({
  declarations: [
   // GraficoComparativaComponent,
    
    HeaderOneComponent,
    HeaderTwoComponent,
    HeaderThreeComponent,
    HeaderFourComponent,
    HeaderSearchComponent,
    MenuBarComponent,
    HeaderCategoryComponent,
    HeaderTopBarComponent,
    MenuTiposComponent,
    NiceSelectComponent,
    PaginationComponent,
    PaginationTwoComponent,
    FooterOneComponent,
    FooterTwoComponent,
    SocialLinksComponent,
    BlogSidebarComponent,
    BlogItemOneComponent,
    BlogItemTwoComponent,
    FashionBlogAreaComponent,
    ElectronicBlogAreaComponent,
    BlogDetailsAreaComponent,
    BlogGridItemComponent,
    BlogListItemComponent,
    BlogPostboxItemComponent,
    JewelryBannerComponent,
    ElectronicProductBannerComponent,
    BackToTopComponent,
    BreadcrumbOneComponent,
    BreadcrumbTwoComponent,
    ShopDetailsBreadcrumbComponent,
    BeautyCategoryComponent,
    ElectronicCategoryComponent,
    FashionCategoryComponent,
    FeatureOneComponent,
    FeatureTwoComponent,
    BlogReplyFormComponent,
    ContactFormComponent,
    LoginFormComponent,
    RegisterFormComponent,
    ShopDetailsFormComponent,
    HeroBannerOneComponent,
    HeroBannerTwoComponent,
    HeroBannerThreeComponent,
    HeroBannerFourComponent,
    InstagramAreaOneComponent,
    InstagramAreaTwoComponent,
    ProductModalComponent,
    VideoPopapComponent,
    CartSidebarComponent,
    MobileSidebarComponent,
    SocialLoginComponent,
    BeautyTestimonialComponent,
    FashionTestimonialComponent,
    ProductDetailsRatingItemComponent,
    ProductDetailsTabNavComponent,
    ProductDetailsThumbComponent,
    ProductDetailsWrapperComponent,
    CountdownTimerComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    GraficoTableauComponent,
    MatIconModule,
   
  ],
  exports: [
   // GraficoComparativaComponent,
    
    HeaderOneComponent,
    HeaderTwoComponent,
    HeaderThreeComponent,
    HeaderFourComponent,
    HeaderSearchComponent,
    MenuBarComponent,
    HeaderCategoryComponent,
    HeaderTopBarComponent,
    MenuTiposComponent,
    NiceSelectComponent,
    PaginationComponent,
    PaginationTwoComponent,
    FooterOneComponent,
    FooterTwoComponent,
    SocialLinksComponent,
    BlogSidebarComponent,
    BlogItemOneComponent,
    BlogItemTwoComponent,
    FashionBlogAreaComponent,
    ElectronicBlogAreaComponent,
    BlogDetailsAreaComponent,
    BlogGridItemComponent,
    BlogListItemComponent,
    BlogPostboxItemComponent,
    JewelryBannerComponent,
    ElectronicProductBannerComponent,
    BackToTopComponent,
    BreadcrumbOneComponent,
    BreadcrumbTwoComponent,
    ShopDetailsBreadcrumbComponent,
    BeautyCategoryComponent,
    ElectronicCategoryComponent,
    FashionCategoryComponent,
    FeatureOneComponent,
    FeatureTwoComponent,
    BlogReplyFormComponent,
    ContactFormComponent,
    LoginFormComponent,
    RegisterFormComponent,
    ShopDetailsFormComponent,
    HeroBannerOneComponent,
    HeroBannerTwoComponent,
    HeroBannerThreeComponent,
    HeroBannerFourComponent,
    InstagramAreaOneComponent,
    InstagramAreaTwoComponent,
    ProductModalComponent,
    VideoPopapComponent,
    CartSidebarComponent,
    MobileSidebarComponent,
    SocialLoginComponent,
    BeautyTestimonialComponent,
    FashionTestimonialComponent,
    ProductDetailsRatingItemComponent,
    ProductDetailsTabNavComponent,
    ProductDetailsThumbComponent,
    ProductDetailsWrapperComponent,
    CountdownTimerComponent
  ]
})
export class SharedModule { }