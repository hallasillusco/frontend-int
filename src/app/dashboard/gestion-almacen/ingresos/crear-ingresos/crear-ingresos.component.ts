import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IngresosService } from '@core/service/ingresos.service';
import { ProductoService } from '@core/service/producto.service';
import { ProveedorService } from '@core/service/proveedor.service';
import { finalize } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-ingresos',
  templateUrl: './crear-ingresos.component.html',
  styleUrl: './crear-ingresos.component.scss'
})
export class CrearIngresosComponent implements OnInit {

  form!: FormGroup
  proveedores!: any;
  productos: any;
  control: any;
  lenght: number = 0;
  submitted = false;
  loading = false;
  ingreso_id: any;
  total=0 ;
  estado= false;
  get detalle(): FormArray {
    return this.form.get('detalle') as FormArray;
  }
  
  constructor(
    private ingresoService: IngresosService,
    private proveedorService:ProveedorService,
    private productoService: ProductoService,
    private fb: FormBuilder,
    private router: Router,
    private datePipe: DatePipe,
    public route: ActivatedRoute,
  ) {
 

  }


  ngOnInit(): void {
    this.route.paramMap
    .subscribe((paramMap: any) => {        
      this.ingreso_id = paramMap.get('id');
    })
    this.createForm();
    this.listaProveedores();
    this.listaProducto();
    this.control = <FormArray>this.form.controls['detalle'];

    if(this.ingreso_id){
      this.getById();
    }
  }

  createForm() {
    this.form = this.fb.group({
      nro:['',Validators.required],
      fecha_ingreso:[this.datePipe.transform(Date.now(),'yyyy-MM-dd')],
      proveedor_id:['',Validators.required],
      total:[''],
      producto_id:[''],
      detalle: this.fb.array([]),
    })
  }

  createFormDetalle():FormGroup{
    return this.fb.group({
      id:[''],
      lote:['', Validators.required],
      producto_id:['',Validators.required],
      cantidad:['', Validators.required],
      precio_compra:['',Validators.required],
      total:[''],
      nombre_producto:[''],
    })

  }

  listaProducto() {
    this.productoService.getEnabledList().subscribe(data=>{
      this.productos = data;
    })
  }

  listaProveedores() {
    this.proveedorService.getEnabledList().subscribe(data=>{
      this.proveedores = data;
    })
  }

  getById(){
    this.ingresoService.getById(this.ingreso_id).subscribe(data=>{
      this.form.patchValue({
        nro: data.nro,
        fecha_ingreso: this.datePipe.transform(data.fecha_ingreso,'yyyy-MM-dd'),
        proveedor_id: data.proveedor_id,          
      })
      this.total = data.total
      data.detalle.forEach((element:any,index:any) => {
          this.sumarControl()
          this.control.controls[index].patchValue({
            id: element.id,
            lote: element.lote.lote,
            producto_id: element.producto_id,
            cantidad: element.cantidad,
            precio_compra: element.precio_compra,
            total: element.cantidad*element.precio_compra,
            nombre_producto: element.producto.codigo+'-'+element.producto.nombre+' ('+element.producto.unidad.nombre+')'
          })
        
      });
    })
  }

  sumarUno(form1:any){
    // console.log(form1.producto_id!='')
      if(form1.producto_id!=''){
        this.lenght = this.control.length;
        for (let index = 0; index < 1; index++) {
          this.control.push(this.createFormDetalle());
  
          this.control.controls[index + this.lenght].get('producto_id').setValue(form1.producto_id.id);
          this.control.controls[index + this.lenght].get('nombre_producto').setValue(form1.producto_id.codigo+'-'+form1.producto_id.nombre+'('+form1.producto_id.unidad.nombre+')');
        }
      }
      else{
        Swal.fire(
          'Ocurrio un problema',
          'Seleccione un producto',
          'error'
          )
      }
  }
  sumarControl(){
    this.control.push(this.createFormDetalle());
  }

  onCantidad(item:any,index:any){
    this.control.controls[index]
    .get('total')
    .setValue(

        Number(this.control.controls[index].get('precio_compra').value)*
        Number(this.control.controls[index].get('cantidad').value)

    )
    this.sumarTotalTotal();
  }
  sumarTotalTotal() {
    this.total = 0;
    for (let i = 0; i < this.control.length; i++) {
        this.total += Number(this.control.controls[i].get('total').value);  
      
    }
  }

  restarUno(item: any) {
    for (let i = 0; i < this.control.controls.length; i++) {
     
         if (item === i) {
          if(this.control.controls[item].get('id').value!=''){
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
                this.ingresoService.deleteDetalle(this.control.controls[i].get('id').value).subscribe( (data: any) => {
                 (<FormArray>this.form.controls['detalle']).removeAt(i);
                 
                  Swal.fire(
                    'Eliminado!',
                    'Registro eliminado.',
                    'success'
                  )        
                  this.sumarTotalTotal();
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
            (<FormArray>this.form.controls['detalle']).removeAt(i);
            this.sumarTotalTotal();
          }
        }
      
    }
  }

  guardar(form:any){
    this.loading=true;
    this.submitted=true;

    if (this.ingreso_id) {
      this.ingresoService.update(this.ingreso_id,form)
      .pipe(
        finalize(() => {

          this.form.markAsPristine();
          this.loading=false;
        })
      )
      .subscribe(
        data => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: data.success,
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['/dashboard/ingresos/listar']);

        },
        (error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Ocurrio un problema',
            text: error.error,
          });
          this.loading=false;
          
        }
      );
    }else{
      this.ingresoService.create(form)
      .pipe(
        finalize(() => {

          this.form.markAsPristine();
          this.loading=false;
        })
      )
      .subscribe(
        data => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: data.success,
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['/dashboard/ingresos/listar']);

        },
        (error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Ocurrio un problema',
            text: error.error,
          });
          this.loading=false;
        }
      );
    }
  }


}
