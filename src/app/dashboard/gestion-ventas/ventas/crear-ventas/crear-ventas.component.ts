import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientesService, LotesService } from '@core';
import { VentasService } from '@core/service/ventas.service';
import { finalize } from 'rxjs';
import Swal from 'sweetalert2';
import { CrearClientesComponent } from '../../clientes/crear-clientes/crear-clientes.component';

@Component({
  selector: 'app-crear-ventas',
  standalone: false,
  templateUrl: './crear-ventas.component.html',
  styleUrl: './crear-ventas.component.scss'
})


export class CrearVentasComponent implements OnInit{
  form!: FormGroup
  clientes!: any;
  productos: any;
  control: any;
  lenght: number = 0;
  submitted = false;
  loading = false;
  total = 0;

  get detalle(): FormArray {
    return this.form.get('detalle') as FormArray;
  }

  constructor(
    private ventaService: VentasService,
    private loteService: LotesService,
    private clienteService:ClientesService,
    private fb: FormBuilder,
    private router: Router,
    private datePipe: DatePipe,
    public route: ActivatedRoute,
    private dialog: MatDialog,
  ) {


  }


  ngOnInit(): void {
    this.listaProducto();
    this.listaClientes();
    this.createForm();
    this.control = <FormArray>this.form.controls['detalle'];
  }

  createForm() {
    this.form = this.fb.group({
      cliente_id:['',Validators.required],
      fecha_registro:[this.datePipe.transform(Date.now(),'yyyy-MM-dd')],
      total:[''],
      lote_id:['',Validators.required],
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

  listaProducto() {
    this.loteService.getEnabledList().subscribe(data=>{
      this.productos = data;
    })
  }

  listaClientes() {
    this.clienteService.getEnabledList().subscribe(data=>{
      this.clientes = data;
    })
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

  sumarTotalTotal() {
    this.total = 0;
    for (let i = 0; i < this.control.length; i++) {
        this.total += Number(this.control.controls[i].get('total').value);

    }
  }

  guardar(form:any){
    this.loading=true;
    this.submitted=true;
    this.ventaService.create(form)
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
          this.router.navigate(['/dashboard/ventas/listar']);

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

