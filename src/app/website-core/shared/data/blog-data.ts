import { IBlogType } from "../types/blog-type";

const blogData: IBlogType[] = [
  {
    id: 1,
    img: '/assets/website/img/blog/grid/blog-bg-11.jpg',
    date: "14 January, 2023",
    author: 'Mark Smith',
    title: "KARLBOX - Colores en negro.",
    tags: ["Colores", "Faber Castell"],
    category: 'Colores',
    comments: 2,
    sm_desc:
      "The world is an amazing place providing an incredible assortment of interesting locations across.",
    blog: "electronics",
    evento:false

  },
  {
    id: 2,
    img: '/assets/website/img/blog/grid/blog-bg-12.jpg',
    date: "18 February, 2023",
    author: 'Naim Ahmed',
    title: "TÉCNICAS PARA LA ACUARELA CONTEMPORÁNEA",
    tags: ["Tecnica", "Acuarela"],
    category: 'Pintura',
    comments: 4,
    sm_desc:
      "The world is an amazing place providing an incredible assortment of interesting locations across.",
    blog: "electronics",
    evento:false

  },
  {
    id: 3,
    img: '/assets/website/img/blog/grid/blog-bg-13.jpg',
    date: "14 January, 2023",
    author: 'Mark Smith',
    title: "ARTSTUDIO PARTE DE TATTO MUSIC FEST 2019 EN CBBA",
    tags: ["Colores", "Faber Castell"],
    category: 'Colores',
    comments: 2,
    sm_desc:
      "The world is an amazing place providing an incredible assortment of interesting locations across.",
    blog: "electronics",
    evento:true
  },
  {
    id: 4,
    img: '/assets/website/img/blog/grid/blog-bg-14.jpg',
    date: "18 February, 2023",
    author: 'Naim Ahmed',
    title: "ARTSTUDIO PARTE DE TATTO MUSIC FEST 2018 SCZ",
    tags: ["Tecnica", "Acuarela"],
    category: 'Pintura',
    comments: 4,
    sm_desc:
      "The world is an amazing place providing an incredible assortment of interesting locations across.",
    blog: "electronics",
    evento:true
  },
  {
    id: 5,
    img: '/assets/website/img/blog/grid/blog-bg-15.jpg',
    date: "14 January, 2023",
    author: 'Mark Smith',
    title: "Art Studio potencia la habilidad artstica en la Comic Con",
    tags: ["Colores", "Faber Castell"],
    category: 'Colores',
    comments: 2,
    sm_desc:
      "The world is an amazing place providing an incredible assortment of interesting locations across.",
    blog: "electronics",
    evento:true
  },
  // {
  //   id: 3,
  //   img: '/assets/website/img/blog/blog-3.jpg',
  //   date: "20 January, 2023",
  //   author: 'Salim Rana',
  //   title: "The Sound Of Fashion: Malcolm",
  //   tags: ["Microphone", "Computer"],
  //   category: 'electronics',
  //   comments: 5,
  //   sm_desc:
  //     "The world is an amazing place providing an incredible assortment of interesting locations across.",
  //   blog: "electronics",
  // },
  // {
  //   id: 4,
  //   img: '/assets/website/img/blog/blog-1.jpg',
  //   date: "18 February, 2023",
  //   author: 'Naim Ahmed',
  //   title: "How clothes are linked to climate",
  //   tags: ["Monitor", "Technology"],
  //   category: 'electronics',
  //   comments: 4,
  //   sm_desc:
  //     "The world is an amazing place providing an incredible assortment of interesting locations across.",
  //   blog: "electronics",
  // },
  // // fashion blog
  // {
  //   id: 4,
  //   img: '/assets/website/img/blog/2/blog-1.jpg',
  //   date: "20 July, 2023",
  //   author: 'John Smith',
  //   title: "The 'Boomerang' Employees Returning After Quitting",
  //   tags: ["Fashion", "Lift Style", "News"],
  //   category: 'fashion',
  //   comments: 6,
  //   sm_desc:
  //     "The world is an amazing place providing an incredible assortment of interesting locations across.",
  //   blog: "fashion",
  // },
  // {
  //   id: 5,
  //   img: '/assets/website/img/blog/2/blog-2.jpg',
  //   date: "18 March, 2023",
  //   author: 'John Smith',
  //   title: "Fast fashion: How clothes are linked to climate change",
  //   tags: ["Fashion", "Lift Style", "News"],
  //   category: 'fashion',
  //   comments: 3,
  //   sm_desc:
  //     "The world is an amazing place providing an incredible assortment of interesting locations across.",
  //   blog: "fashion",
  // },
  // {
  //   id: 6,
  //   img: '/assets/website/img/blog/2/blog-3.jpg',
  //   date: "15 February, 2023",
  //   author: 'John Smith',
  //   title: "The Sound Of Fashion: Malcolm McLaren Words",
  //   tags: ["Fashion", "Lift Style", "News"],
  //   category: 'fashion',
  //   comments: 8,
  //   sm_desc:
  //     "The world is an amazing place providing an incredible assortment of interesting locations across.",
  //   blog: "fashion",
  // },
  // //postbox blog
  // {
  //   id: 7,
  //   img: '/assets/website/img/blog/blog-big-3.jpg',
  //   date: 'July 21, 2023',
  //   author: 'John Smith',
  //   comments: 2,
  //   tags: ["Fashion", "Lift Style", "News"],
  //   category: 'Beauty',
  //   title: 'How to Clean Your Home Faster and More Efficiently',
  //   desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat',
  //   blog: 'blog-postbox'
  // },
  {
    id: 8,
    img: '/assets/website/img/blog/blog-big-2.jpg',
    date: 'April 18, 2023',
    author: 'Mark Smith',
    comments: 5,
    tags: ["Fashion", "Lift Style", "News"],
    category: 'Beauty',
    title: 'Four Ways a Clean Workplace Makes Employees Happy and Healthy',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat',
    video: true,
    video_id: '457mlqV1gzA',
    blog: 'blog-postbox'
  },
  {
    id: 9,
    img: '/assets/website/img/blog/blog-big-2.jpg',
    date: 'April 18, 2023',
    author: 'Mark Smith',
    comments: 5,
    tags: ["Fashion", "Lift Style", "News"],
    category: 'Beauty',
    title: 'Four Ways a Clean Workplace Makes Employees Happy and Healthy',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat',
    video: true,
    video_id: '457mlqV1gzA',
    blog: 'blog-postbox'
  },
  {
    id: 10,
    img: '/assets/website/img/blog/blog-big-2.jpg',
    date: 'April 18, 2023',
    author: 'Mark Smith',
    comments: 5,
    tags: ["Fashion", "Lift Style", "News"],
    category: 'Beauty',
    title: 'Four Ways a Clean Workplace Makes Employees Happy and Healthy',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat',
    video: true,
    video_id: '457mlqV1gzA',
    blog: 'blog-postbox'
  },
  // {
  //   id: 9,
  //   date: 'March 15, 2023',
  //   author: 'Shahnewaz Sakil',
  //   comments: 8,
  //   tags: ["Fashion", "Lift Style", "News"],
  //   category: 'Beauty',
  //   title: 'Only one thing is impossible for God: To find any sense in any copyright law on the planet.',
  //   desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat',
  //   blockquote: true,
  //   blog: 'blog-postbox'
  // },
  // {
  //   id: 10,
  //   img:'/assets/website/img/blog/blog-big-5.jpg',
  //   date: 'January 20, 2023',
  //   author: 'Salim Rana',
  //   comments: 10,
  //   tags: ["Fashion", "Lift Style", "News"],
  //   category: 'Beauty',
  //   title: 'Time for Spring Cleaning? Use These Tips From the Professionals',
  //   desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat',
  //   blog: 'blog-postbox'
  // },
  // {
  //   id: 11,
  //   slider: true,
  //   slider_images: ['/assets/website/img/blog/blog-big-4.jpg', '/assets/website/img/blog/blog-big-5.jpg', '/assets/website/img/blog/blog-big-6.jpg'],
  //   date: 'February 20, 2023',
  //   author: 'Smith Mark',
  //   comments: 12,
  //   tags: ["Fashion", "Lift Style", "News"],
  //   category: 'Beauty',
  //   title: 'Time for Spring Cleaning? Use These Tips From the Professionals',
  //   desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat',
  //   blog: 'blog-postbox'
  // },
  // // blog grid data
  {
    id: 12,
    img: '/assets/website/img/blog/grid/blog-bg-11.jpg',
    list_img: '/assets/website/img/blog/grid/blog-grid-1.jpg',
    date: 'January 8, 2023',
    author: 'John Smith',
    comments: 5,
    tags: ["Fashion", "Lift Style", "News"],
    category: 'Beauty',
    title: "KARLBOX - Colores en negro.",
    desc: 'Cursus mattis sociis natoque penatibus et magnis montes,nascetur ridiculus.',
    blog: 'blog-grid',
    evento:false

  },
  {
    id: 13,
    img: '/assets/website/img/blog/grid/blog-bg-12.jpg',
    list_img: '/assets/website/img/blog/grid/blog-grid-2.jpg',
    date: 'February 12, 2023',
    author: 'Salim Rana',
    comments: 0,
    tags: ["Fashion", "Lift Style", "News"],
    category: 'Beauty',
    title: "TÉCNICAS PARA LA ACUARELA CONTEMPORÁNEA",
    desc: 'Cursus mattis sociis natoque penatibus et magnis montes,nascetur ridiculus.',
    blog: 'blog-grid',
    evento:false

  },
  {
    id: 14,
    img: '/assets/website/img/blog/grid/blog-bg-13.jpg',
    list_img: '/assets/website/img/blog/grid/blog-grid-3.jpg',
    date: 'March 15, 2023',
    author: 'John Smith',
    comments: 12,
    tags: ["Fashion", "Lift Style", "News"],
    category: 'Beauty',
    title: "ARTSTUDIO PARTE DE TATTO MUSIC FEST 2019 EN CBBA",
    desc: 'Cursus mattis sociis natoque penatibus et magnis montes,nascetur ridiculus.',
    blog: 'blog-grid',
    evento:true
  },
  {
    id: 15,
    img: '/assets/website/img/blog/grid/blog-bg-14.jpg',
    list_img: '/assets/website/img/blog/grid/blog-grid-4.jpg',
    date: 'April 7, 2023',
    author: 'John Smith',
    comments: 8,
    tags: ["Fashion", "Lift Style", "News"],
    category: 'Beauty',
    title: "ARTSTUDIO PARTE DE TATTO MUSIC FEST 2018 SCZ",
    desc: 'Cursus mattis sociis natoque penatibus et magnis montes,nascetur ridiculus.',
    blog: 'blog-grid',
    evento:true

  },
  {
    id: 16,
    img: '/assets/website/img/blog/grid/blog-bg-15.jpg',
    list_img: '/assets/website/img/blog/grid/blog-grid-5.jpg',
    date: 'May 2, 2023',
    author: 'John Smith',
    comments: 4,
    tags: ["Fashion", "Lift Style", "News"],
    category: 'Beauty',
    title: "Art Studio potencia la habilidad artstica en la Comic Con",
    desc: 'Cursus mattis sociis natoque penatibus et magnis montes,nascetur ridiculus.',
    blog: 'blog-grid',
    evento:true
  },
  // {
  //   id: 17,
  //   img: '/assets/website/img/blog/grid/blog-grid-6.jpg',
  //   list_img: '/assets/website/img/blog/grid/blog-grid-6.jpg',
  //   date: 'April 5, 2023',
  //   author: 'John Smith',
  //   comments: 6,
  //   tags: ["Fashion", "Lift Style", "News"],
  //   category: 'Beauty',
  //   title: 'Freelancer Days 2022, What’s new?',
  //   desc: 'Cursus mattis sociis natoque penatibus et magnis montes,nascetur ridiculus.',
  //   blog: 'blog-grid'
  // },
  // {
  //   id: 18,
  //   img: '/assets/website/img/blog/grid/blog-grid-7.jpg',
  //   list_img: '/assets/website/img/blog/grid/blog-grid-7.jpg',
  //   date: 'May 12, 2023',
  //   author: 'John Smith',
  //   comments: 6,
  //   tags: ["Fashion", "Lift Style", "News"],
  //   category: 'Beauty',
  //   title: 'Hiring the Right Sales Team at the Right Time',
  //   desc: 'Cursus mattis sociis natoque penatibus et magnis montes,nascetur ridiculus.',
  //   blog: 'blog-grid'
  // },
  // {
  //   id: 19,
  //   img: '/assets/website/img/blog/grid/blog-grid-8.jpg',
  //   list_img: '/assets/website/img/blog/grid/blog-grid-8.jpg',
  //   date: 'March 22, 2023',
  //   author: 'John Smith',
  //   comments: 15,
  //   tags: ["Fashion", "Lift Style", "News"],
  //   category: 'Beauty',
  //   title: 'Quality Foods Requirments For Every Human Body’s',
  //   desc: 'Cursus mattis sociis natoque penatibus et magnis montes,nascetur ridiculus.',
  //   blog: 'blog-grid'
  // },
];

export default blogData;
