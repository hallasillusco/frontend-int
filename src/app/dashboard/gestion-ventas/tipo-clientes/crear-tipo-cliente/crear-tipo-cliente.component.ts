import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TipoClientesService } from '@core/service/tipo-clientes.service';
import { finalize } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-tipo-cliente',
  templateUrl: './crear-tipo-cliente.component.html',
  styleUrl: './crear-tipo-cliente.component.scss'
})
export class CrearTipoClienteComponent implements OnInit {
  form!: FormGroup;

  hide = true;
  submitted = false;
  loading = false;
  tipos: any;
  constructor(
    public dialogRef: MatDialogRef<CrearTipoClienteComponent>,
    private fb: FormBuilder,
    private tipoClienteService: TipoClientesService,
    @Inject(MAT_DIALOG_DATA) private data:any
    ) {
      this.createForm();
    }

  close(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.listaTipoClientes();
    if (this.data.estado === true)
      this.getById();
  }

  listaTipoClientes() {
    this.tipoClienteService.getEnabledList().subscribe(data=>{
      this.tipos = data
    });
  }

  getById(){
    this.tipoClienteService.getById(this.data.id).subscribe(data=>{
      console.log(data);
      this.form.patchValue({
        descuento:data.descuento,
        nombre:data.nombre
      });
    })
  }

  createForm(){
    this.form = this.fb.group({
      descuento: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      nombre: ['',[Validators.required, Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*')]],
    })
  }

  register(form: any){

    if(this.data.estado === true){
      this.tipoClienteService.update(this.data.id, form).pipe(
        finalize(() => {
          this.form.markAsPristine();
        })
      ).subscribe(
        dataE => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Registro editado con exito',
            showConfirmButton: false,
            timer: 1500
          });
          this.dialogRef.close(dataE);
        },
        (error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Ocurrio un problema',
            text: error.error,
          });
        }
      );
    } else {
      this.tipoClienteService.create(form).pipe(finalize(() => {
        this.form.markAsPristine();
      })
      )
      .subscribe(
        dataR => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Registro creado con exito',
            text: dataR.success,
            showConfirmButton: false,
            timer: 1500
          });
          this.dialogRef.close(dataR);
        },
        (error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Ocurrio un probema',
            text: error.error,
          });
        }
      );
    }
  }
}
