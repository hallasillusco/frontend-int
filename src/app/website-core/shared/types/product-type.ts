type IReview = {
  user?:string;
  name:string;
  email:string;
  rating:number;
  review:string;
  date:string;
}

export interface IProduct {
  id: string;
  sku: string;
  img: string;
  title: string;
  slug: string;
  unit: string;
  imageURLs: {
    color?: {
      name: string;
      clrCode: string;
    };
    img: string;
  }[];
  parent: string;
  children: string;
  price: number;
  discount: number;
  quantity: number;
  brand: {
    name: string;
  };
  category: {
    name: string;
  };
  status: string;
  reviews?: IReview[];
  productType: string;
  description: string;
  orderQuantity?: number;
  additionalInformation: {
    key: string;
    value: string;
  }[];
  featured?: boolean;
  sellCount: number;
  offerDate?:{
    startDate:string;
    endDate:string;
  }
  tags?: string[];
  videoId?:string;
  sizes?:string[];
}

export interface IUnidad {
  id: number;
  nombre: string;
  sigla: string;
  habilitado: number;
  created_at: string;
}

export interface ISubCategoria {
  id: number;
  nombre: string;
  habilitado: number;
  categoria_id: number;
  created_at: string;
  updated_at: string;
}

export interface ICategoria {
  id: number;
  nombre: string;
  sub_categorias: ISubCategoria,
  habilitado: number;
  created_at: string;
  updated_at: string;
}

interface Imagen {
  id: number;
  img_url: string;
  portada: number;
  habilitado: number;
  producto_id: number;
  created_at: string;
  updated_at: string;
}

export interface IMarca {
  id: number;
  nombre: string;
  img_url: string | null;
  habilitado: number;
  created_at: string;
  updated_at: string;
}

export interface ITipos {
  id: number;
  nombre: string;
  habilitado: number;
  menu: number;
  created_at: string;
  updated_at: string;
  categorias: ICategoria[];
}

export interface IColores{
  nombre: string,
  codigo: string
}

export interface IProducto {
  slug: string;
  detalle: string;
  destacado: number;
  tipo_id: number;
  tipo: ITipos;
  sub_categoria_id: number;
  sub_categoria: ISubCategoria;
  categoria: ICategoria;
  colores: IColores
  categoria_id: number;
  codigo: string;
  created_at: string;
  descripcion: string;
  habilitado: number;
  id: number;
  imagenes: Imagen;
  img_url: string;
  marca_id: number;
  marca: IMarca
  nombre: string;
  precio_desc: number;
  precio_unit: number;
  stock: number;
  unidad: IUnidad;
  unidad_id: number;
  descuento: any;
  orderQuantity?: number;
}