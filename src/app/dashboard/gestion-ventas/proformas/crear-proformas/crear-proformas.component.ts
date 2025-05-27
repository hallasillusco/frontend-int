import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProformasService, VentasService } from '@core';
import { ClientesService } from '@core';
import { LotesService } from '@core';
import { CrearClientesComponent } from '../../clientes/crear-clientes/crear-clientes.component';
import { finalize } from 'rxjs';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-crear-proformas',
  templateUrl: './crear-proformas.component.html',
  styleUrl: './crear-proformas.component.scss'
})

export class CrearProformasComponent implements OnInit{
  form!: FormGroup;
  Proformas: any;
  clientes!: any;
  lotes!: any;
  control: any;
  lenght: number = 0;
  submitted = false;
  loading = false;
  isloading = false;
  proforma_id: any;
  total = 0;

  get detalle(): FormArray {
    return this.form.get('detalle') as FormArray;
  }

  constructor(
    private proformaService: ProformasService,
    private ventasService: VentasService,
    private clienteService: ClientesService,
    private loteService: LotesService,
    private fb: FormBuilder,
    private router: Router,
    private datePipe: DatePipe,
    public route: ActivatedRoute,
    private dialog: MatDialog,
    ) {
    }

  ngOnInit(): void {
    this.route.paramMap
    .subscribe((paramMap: any) => {
      this.proforma_id = paramMap.get('id');
    })
    this.createForm();
    this.listaClientes();
    this.listaLotes();

    this.control = <FormArray>this.form.controls['detalle'];
    if(this.proforma_id){
      this.getById();
    }
  }

  createForm() {
    this.form = this.fb.group({
      fecha_registro:[this.datePipe.transform(Date.now(),'yyyy-MM-dd')],
      cantidad:[''],
      precio:[''],
      cliente_id:['',Validators.required],
      lote_id:[''],
      detalle: this.fb.array([]),
    })
  }

  createFormDetalle():FormGroup{
    return this.fb.group({
      lote_id:['',Validators.required],
      cantidad:['', Validators.required],
      precio:['',Validators.required],
      total:[''],
      nombre_producto:[''],
      stock:[''],
    })
  }

  listaClientes() {
    this.clienteService.getEnabledList().subscribe(data=>{
      this.clientes = data;
    })
  }
  listaLotes() {
    this.loteService.getEnabledList().subscribe(data=>{
      this.lotes = data;
    })
  }

  getById(){
    this.proformaService.getById(this.proforma_id).subscribe(data=>{
      this.form.patchValue({
        fecha_registro: this.datePipe.transform(data.fecha_registro,'yyyy-MM-dd'),
        cantidad: data.cantidad,
        precio: data.precio,
        cliente_id: data.cliente_id,
        lote_id: data.lote_id
      })
      this.total = data.total
      data.detalle.forEach((element:any,index:any) => {
        this.sumarControl()
        this.control.controls[index].patchValue({
          lote_id: element.lote_id,
          stock: element.lote.cantidad_actual,
          cantidad: element.cantidad,
          precio: element.precio,
          total: element.cantidad*element.precio,
          nombre_producto: element.producto.codigo+'-'+element.producto.nombre+' ('+element.producto.unidad.nombre+')'
        })

    });
    })
  }

  sumarUno(form1:any){
    if (!form1 || !form1.lote_id || !form1.lote_id.id) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, selecciona producto antes de agregar.',
      });
      return;
    }
    this.lenght = this.control.length;
    for (let index = 0; index < 1; index++) {
      this.control.push(this.createFormDetalle());
      this.control.controls[index + this.lenght].get('lote_id').setValue(form1.lote_id.id);
      this.control.controls[index + this.lenght].get('nombre_producto').setValue(form1.lote_id.txt_detalle);
      this.control.controls[index + this.lenght].get('stock').setValue(form1.lote_id.cantidad_actual);
      this.control.controls[index + this.lenght].get('precio').setValue(form1.lote_id.producto.precio_unit);
    }
  }

  onCantidad(item:any,index:any){
    this.control.controls[index]
    .get('total')
    .setValue(

        Number(this.control.controls[index].get('precio').value)*
        Number(this.control.controls[index].get('cantidad').value)

    )
    this.sumarTotalTotal()
  }

  restarUno(item: any) {
    for (let i = 0; i < this.control.controls.length; i++) {
         if (item === i) {
            (<FormArray>this.form.controls['detalle']).removeAt(i);
            this.sumarTotalTotal();
        }

    }
  }

  sumarControl(){
    this.control.push(this.createFormDetalle());
  }

  sumarTotalTotal() {
    this.total=0;
    for (let i = 0; i < this.control.length; i++) {
        this.total += Number(this.control.controls[i].get('total').value);

    }
  }

  agregarCliente(){
    const dialogRef = this.dialog.open(CrearClientesComponent, {
      data: {
        estado: false,
        title: 'Nuevo Registro'
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result) {
        this.listaClientes();
        this.form.get('cliente_id')?.setValue(result.cliente.id);
      }

    });
  }

  guardar(form:any){
    this.loading=true;
    this.submitted=true;
    this.proformaService.create(form);
    if (this.proforma_id) {
      this.proformaService.update(this.proforma_id,form)
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
          this.router.navigate(['/dashboard/proformas/listar']);

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
      this.proformaService.create(form)
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
          this.router.navigate(['/dashboard/proformas/listar']);

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

  pasarVenta(form:any){
    this.isloading=true;
    this.submitted=true;
    this.proformaService.create(form);
    if (this.proforma_id) {
      this.ventasService.ventasProforma(this.proforma_id,form)
      .pipe(
        finalize(() => {

          this.form.markAsPristine();
          this.isloading=false;
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
          this.router.navigate(['/dashboard/proformas/listar']);

        },
        (error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Ocurrio un problema',
            text: error.error,
          });
          this.isloading=false;

        }
      );
    }
  }
}

