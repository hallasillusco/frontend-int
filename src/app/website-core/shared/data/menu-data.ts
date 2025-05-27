import { IMenuItem, IMobileType } from "../types/menu-d-type";

export const menu_data:IMenuItem[] = [
  // {
  //   id:1,
  //   link:'/website/home',
  //   title:'Inicio',
  //   mega_menu:false,
  // //   home_pages:[
  // //     {
  // //       id:1,
  // //       title:'Electronics',
  // //       img:'/assets/img/menu/menu-home-1.jpg',
  // //       link:'/home/electronic'
  // //     },
  // //     {
  // //       id:2,
  // //       title:'Fashion',
  // //       img:'/assets/img/menu/menu-home-2.jpg',
  // //       link:'/home/fashion'
  // //     },
  // //     {
  // //       id:3,
  // //       title:'Beauty',
  // //       img:'/assets/img/menu/menu-home-3.jpg',
  // //       link:'/home/beauty'
  // //     },
  // //     {
  // //       id:4,
  // //       title:'Jewelry',
  // //       img:'/assets/img/menu/menu-home-4.jpg',
  // //       link:'/home/jewelry'
  // //     },
  // //   ]
  // },
  {
    id:1,
    link:'/website/about',
    title:'Quienes Somos',
    mega_menu:false,
  },
  
  // {
  //   id:2,
  //   link:'/shop',
  //   title:'Catálogo',
  //   mega_menu:true,
  //   shop_mega_menus:[
  //     {
  //       link:'/shop',
  //       title:'Shop Pages',
  //       list_menus:[
  //         {title:'Grid Layout',link:'/shop'},
  //         {title:'Shop Categories',link:'/shop/shop-category'},
  //         {title:'List Layout',link:'/shop/shop-list'},
  //         {title:'Full width Layout',link:'/shop/shop-full-width'},
  //         {title:'1600px Layout',link:'/shop/shop-1600'},
  //         {title:'Left Sidebar',link:'/shop'},
  //         {title:'Right Sidebar',link:'/shop/shop-right-sidebar'},
  //         {title:'Hidden Sidebar',link:'/shop/shop-no-sidebar'},
  //       ]
  //     },
  //     {
  //       link:'/shop',
  //       title:'Features',
  //       list_menus:[
  //         {title:'Filter Dropdown',link:'/shop/shop-filter-dropdown'},
  //         {title:'Filters Offcanvas',link:'/shop/shop-filter-offcanvas'},
  //         {title:'Filters Sidebar',link:'/shop'},
  //         {title:'Load More button',link:'/shop/shop-load-more'},
  //         {title:'1600px Layout',link:'/shop/shop-1600'},
  //         {title:'Collections list',link:'/shop/shop-list'},
  //         {title:'Hidden search',link:'/shop'},
  //         {title:'Search Full screen',link:'/shop'},
  //       ]
  //     },
  //     {
  //       link:'/shop',
  //       title:'Hover Style',
  //       list_menus:[
  //         {title:'Hover Style 1',link:'/shop'},
  //         {title:'Hover Style 2',link:'/shop'},
  //         {title:'Hover Style 3',link:'/shop'},
  //         {title:'Hover Style 4',link:'/shop'}
  //       ]
  //     },
  //   ]
  // },
  {
    id:3,
    link:'/website/shop',
    title:'Productos',
    mega_menu:false  ,
  //   product_menus:[
  //     {
  //       id:1,
  //       title:'Shop Page',
  //       link:'/shop',
  //       dropdown_menus:[
  //         {title:'Only Categories',link:'/shop/shop-category'},
  //         {title:'Shop Grid with Sidebar',link:'/shop/shop-filter-offcanvas'},
  //         {title:'Shop Grid',link:'/shop'},
  //         {title:'Categories',link:'/shop/shop-category'},
  //         {title:'Shop List',link:'/shop/shop-list'},
  //         {title:'Product Details',link:'/shop/shop-details'},
  //       ]
  //     },
  //     {
  //       id:2,
  //       title:'Productos',
  //       link:'/shop',
  //       dropdown_menus:[
  //         {title:'Product Simple',link:'/shop/shop-details'},
  //         {title:'With Video',link:'/shop/shop-details-with-video'},
  //         {title:'With Countdown Timer',link:'/shop/shop-details-with-countdown'},
  //         {title:'Variations Swatches',link:'/shop/shop-details'},
  //         {title:'List View',link:'/shop/shop-details-list'},
  //         {title:'Details Gallery',link:'/shop/shop-details-gallery'}
  //       ]
  //     },
  //     {
  //       id:3,
  //       title:'eCommerce',
  //       link:'/shop',
  //       dropdown_menus:[
  //         {title:'Shopping Cart',link:'/shop/cart'},
  //         {title:'Track Your Order',link:'/shop/order'},
  //         {title:'Compare',link:'/shop/compare'},
  //         {title:'Wishlist',link:'/shop/wishlist'},
  //         {title:'Checkout',link:'/pages/checkout'},
  //         {title:'My account',link:'/pages/profile'}
  //       ]
  //     },
  //     {
  //       id:4,
  //       title:'More Pages',
  //       link:'/shop',
  //       dropdown_menus:[
  //         {title:'About',link:'/pages/about'},
  //         {title:'Login',link:'/pages/login'},
  //         {title:'Register',link:'/pages/register'},
  //         {title:'Forgot Password',link:'/pages/forgot'},
  //         {title:'404 Error',link:'/pages/404'}
  //       ]
  //     },
  //   ]
  },

 
  {
    id:1,
    link:'/website/contacto',
    title:'Contacto',
    mega_menu:false,
  },
  
]

// mobile menu data
export const mobile_menu:IMobileType[] = [
  {
    id: 1,
    homes: false,
    title: 'Inicio',
    link:'/website/home',
  },
  {
    id:2,
    homes:false,
    title:'Quienes Somos',
    link:'/website/about'
  },
  {
    id: 3,
    sub_menu: false,
    title: 'Productos',
    link:'/website/shop',
  },

  {
    id: 4,
    sub_menu: false,
    title:'Eventos',
    link:'/website/eventos/2',

  },
  {
    id: 4,
    sub_menu: false,
    title:'Blogs',
    link:'/website/blog/1',
  },
  {
    id: 4,
    sub_menu: false,
    title:'Videos',
    link:'/website/videos',
  },
  {
    id: 4,
    sub_menu: false,
    title:'Contactos',
    link:'/website/contacto',
  },

   //{
  //   id: 5,
  //   sub_menu: true,
  //   title: 'More Pages',
  //   link: '/login',
  //   sub_menus: [
  //     {title:'About',link:'/pages/about'},
  //     {title:'Login',link:'/pages/login'},
  //     {title:'Register',link:'/pages/register'},
  //     {title:'Forgot Password',link:'/pages/forgot'},
  //     {title:'404 Error',link:'/pages/404'}
  //   ],
  // },
  // {
  //   id: 6,
  //   single_link: true,
  //   title: 'Coupons',
  //   link: '/pages/coupons',
  // },
   {
    id: 7,
    sub_menu: true,
    title: 'Blog',
    link: '/pages/blog',
    sub_menus: [
      {title:'Blog Standard',link:'/pages/blog'},
      {title:'Blog Grid',link:'/pages/blog-grid'},
      {title:'Blog List',link:'/pages/blog-list'},
      {title:'Blog Details',link:'/pages/blog-details'}
    ]
  },
  // {
  //   id: 8,
  //   single_link: true,
  //   title: 'Contact',
  //   link: '/pages/contact',
  // },
]
