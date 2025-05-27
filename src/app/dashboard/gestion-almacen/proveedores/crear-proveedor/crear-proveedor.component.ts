import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProveedorService } from '@core/service/proveedor.service';
import { finalize } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-proveedor',
  templateUrl: './crear-proveedor.component.html',
  styleUrl: './crear-proveedor.component.scss'
})
export class CrearProveedorComponent implements OnInit {
  form!: FormGroup;

  hide = true;
  submitted = false;
  loading = false;
  

  constructor(
    public dialogRef: MatDialogRef<CrearProveedorComponent>,
    private fb: FormBuilder,
    private proveedorService: ProveedorService,
    @Inject(MAT_DIALOG_DATA) private data:any
    ) {
      this.createForm();
    }

  close(): void {
    this.dialogRef.close();
  }


  ngOnInit(): void {
    if (this.data.estado === true){
      this.getById();
    }
  }

  getById() {
    this.proveedorService.getById(this.data.id).subscribe(data=>{
      this.form.patchValue({
        razon_social: data.razon_social,
        nit: data.nit
      })
    })
  }

  createForm(){
    this.form = this.fb.group({
      razon_social: [
        '',
      [Validators.required, Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*')]],
      nit: ['',
        [
        Validators.required,
        Validators.pattern('[0-9]*')
        ]
      ],
    })
  }

  register(form: any){
    this.submitted = true;
    this.loading = true;
    if(this.data.estado === true){
      this.proveedorService.update(this.data.id, form).pipe(
        finalize(() => {
          this.form.markAsPristine();
          this.loading = false;
        })
      ).subscribe(
        dataE => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Proveedor editado con exito',
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
          this.submitted = false;
          this.loading = false;
        }
      );
    } else {
      this.proveedorService.create(form).pipe(finalize(() => {
        this.form.markAsPristine();
        this.loading = false;
      })
      )
      .subscribe(
        dataR => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Proveedor creado con exito',
            text: dataR.success,
            showConfirmButton: false,
            timer: 1500
          });
          this.dialogRef.close(dataR);
        },
        (error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Ocurrio un problema',
            text: error.error,
          });
          this.submitted = false;
          this.loading = false;
        }
      );
    }
  }
}
