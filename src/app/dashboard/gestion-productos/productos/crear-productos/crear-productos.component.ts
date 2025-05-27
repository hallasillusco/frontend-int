import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductoService, TiposService } from '@core';
import { CategoriaService } from '@core';
import { UnidadService } from '@core/service/unidad.service';
import { finalize } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Swal from 'sweetalert2';
import { MarcasService } from '@core/service/marcas.service';
import { SubCategoriasService } from '@core/service/sub-categorias.service';

@Component({
  selector: 'app-crear-productos',
  templateUrl: './crear-productos.component.html',
  styleUrl: './crear-productos.component.scss'
})
export class CrearProductosComponent implements OnInit {
  form!: FormGroup;
  id:any;
  categorias: any;
  unidades: any;
  submitted = false;
  loading = false;
  imagen: any;
  extension!:boolean;
  public Editor: any = ClassicEditor;
  tipos: any;
  marcas: any;
  subC: any;
  control: any;
  get colores(): FormArray {
    return this.form.get('colores') as FormArray;
  }

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private productoService: ProductoService,
    private categoriaService: CategoriaService,
    private unidadesService: UnidadService,
    private tiposService:TiposService,
    private marcasService:MarcasService,
    private subCategoriasService:SubCategoriasService,
    public route: ActivatedRoute,
    // private datePipe: DatePipe
    ) {
      this.createForm();
    }


    ngOnInit(): void {
      this.listaUnidades();
      this.listaTipos();
      this.listaSubCategorias('');
      this.listaMarcas();
      this.listaCategorias('');

      this.route.paramMap
      .subscribe((paramMap: any) => {        
        this.id = paramMap.get('id');
        console.log(this.id);
      })
      this.form.get("tipo_id")?.valueChanges.subscribe(data=>{
        this.listaCategorias(data);
      })
      this.form.get("categoria_id")?.valueChanges.subscribe(data=>{
        this.listaSubCategorias(data);
      })


      this.control = <FormArray>this.form.controls['colores'];

      if (this.id){
        this.getById();
      }
    }

  getById() {
    this.productoService.getById(this.id).subscribe(data=>{
      this.form.patchValue({
        nombre: data.nombre,
        codigo: data.codigo,
        detalle: data.detalle,
        descripcion: data.descripcion,
        file: data.img_url,
        precio_unit: data.precio_unit,
        unidad_id: data.unidad_id,
        categoria_id: data.categoria_id,
        tipo_id: data.tipo_id,
        marca_id: data.marca_id,
        sub_categoria_id: data.sub_categoria_id,
        precio_desc: data.precio_desc,
        descuento: data.descuento,
      })

      data.colores.forEach((element:any,index:any) => {
        this.sumarControl();
        this.control.controls[index].patchValue({
          id: element.id,
          nombre: element.nombre,
          codigo: element.codigo
        })
      });
    })

  }

  createForm(){
    this.form = this.fb.group({
      nombre: [
        '',
      Validators.required],
      codigo: ['', Validators.required],
      detalle: [''],
      descripcion: [''],
      file: [''],
      precio_unit: ['', [Validators.required, Validators.pattern('[0-9].*')]],
      descuento: [''],
      precio_desc: [''],
      unidad_id: ['',Validators.required],
      tipo_id: ['', Validators.required],
      categoria_id: ['', Validators.required],
      sub_categoria_id: ['', Validators.required],
      marca_id: ['', Validators.required],
      archivos: this.fb.array([]),
      colores: this.fb.array([])
    })
  }

  coloresControl():FormGroup{
    return this.fb.group({
      id:[''],
      nombre:[''],
      codigo:['']
    })
  }

  sumarControl(){
    this.control.push(this.coloresControl());
  }

  restarControl(index:any){
    console.log(index);
    
    for (let i = 0; i < this.control.controls.length; i++) {
      if (index === i) {
        if(this.control.controls[index].get('id').value!=''){
          Swal.fire({
            title: '¿Está seguro?',
            text: "El registro sera eliminado del sistema",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'primary',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, bórralo!',
            cancelButtonText: 'No, cancelar!',
          }).then((result) => {
            if (result.isConfirmed) {
              this.productoService.deleteColores(this.control.controls[i].get('id').value).subscribe( (data: any) => {
               (<FormArray>this.form.controls['colores']).removeAt(i);
               
                Swal.fire(
                  'Eliminado!',
                  'Registro eliminado.',
                  'success'
                )        
              },
              (error: any) => {
                Swal.fire({
                  icon: 'error',
                  title: 'Ocurrio un problema',
                  text: error.error
                });
              }
              );
            } else if (
              result.dismiss === Swal.DismissReason.cancel
            ) {
              Swal.fire(
                'Cancelado',
                'Registro no eliminado',
                'error'
                )
              }
          })
        }else{
          (<FormArray>this.form.controls['colores']).removeAt(i);
        }
      }
    }
  }
 

  detectFiles(event:any) {
    let files = event.target.files;
    if (files) {
      for (let file of files) {
        let reader = new FileReader();
        let  aplication = file.type.slice(0,5)

        reader.onload = (e: any) => {
            this.archivos.push(this.createItem({
               file,
                url: e.target.result,         
                extension: aplication
              }));
              // this.ngOnInit()
        }
        reader.readAsDataURL(file);
      }
    }
  }
  createItem(data:any): FormGroup {
    return this.fb.group(data);
  }

  removePhoto(i:any){
		this.archivos.removeAt(i);
	}

  get archivos(): FormArray {
     return this.form.get('archivos') as FormArray;
   };

  agregarFoto(data: any){
    this.imagen = data.file;
   }

  listaCategorias(tipo_id:any){
    this.categoriaService.tipos(tipo_id).subscribe(data=>{
      this.categorias = data;
    });
  }

  listaSubCategorias(categoria_id:any){
    this.subCategoriasService.categorias(categoria_id).subscribe(data=>{
      this.subC = data
    })
  }
  
  listaUnidades(){
    this.unidadesService.getAll().subscribe(data=>{
      this.unidades = data;
    });
  }

  listaTipos() {
    this.tiposService.getEnabledList().subscribe(data=>{
      this.tipos = data
    });
  }

  listaMarcas(){
    this.marcasService.getEnabledList().subscribe(data=>{
      this.marcas = data
    })
  }


  register(form: any){
    this.submitted = true;
    this.loading = true;

    const formData = new FormData();

    formData.append('nombre',form.nombre);
    formData.append('codigo',form.codigo);
    formData.append('detalle',form.detalle);
    formData.append('descripcion',form.descripcion);
    formData.append('precio_unit',form.precio_unit);
    formData.append('descuento',form.descuento);
    formData.append('precio_desc',form.precio_desc);
    formData.append('unidad_id',form.unidad_id);
    formData.append('categoria_id',form.categoria_id);
    formData.append('tipo_id',form.tipo_id);
    formData.append('marca_id',form.marca_id);
    formData.append('sub_categoria_id',form.sub_categoria_id);

    for  (var i =  0; i <  this.form.value.archivos.length; i++)  {
        formData.append("archivos[]",   this.form.value.archivos[i].file);
    }

    if (this.imagen) {
      console.log(this.imagen);
      formData.append('file', this.imagen);
     }else{
      formData.append('file', '');
     }

     formData.append('colores', JSON.stringify(this.form.value.colores))

    if(this.id){
      formData.append("_method", "PUT");
      this.productoService.updatePost(this.id, formData).pipe(
        finalize(() => {
          this.form.markAsPristine();
          this.loading = false;
        })
      ).subscribe(
        dataE => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Producto editado con exito',
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['/dashboard/productos/listar']);

        },
        (error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.error,
          });
          this.submitted = false;
          this.loading = false;
        }
      );
    } else {
      this.productoService.create(formData).pipe(finalize(() => {
        this.form.markAsPristine();
        this.loading = false;
      })
      )
      .subscribe(
        dataR => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Producto creado con exito',
            text: dataR.succes,
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['/dashboard/productos/listar']);

        },
        (error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.error,
          });
          this.submitted = false;
          this.loading = false;
        }
      );
    }
    
  }

  cerrar()
  {
    this.router.navigateByUrl('dashboard/productos/listar');
  }
}
