import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MarcasService } from '@core/service/marcas.service';
import { finalize } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-marcas',
  templateUrl: './crear-marcas.component.html',
  styleUrl: './crear-marcas.component.scss'
})
export class CrearMarcasComponent implements OnInit{
  form!: FormGroup;
  hide = true;
  submitted = false;
  loading = false;

  constructor(
    public dialogRef: MatDialogRef<CrearMarcasComponent>,
    private fb: FormBuilder,
    private marcasService: MarcasService,
    @Inject(MAT_DIALOG_DATA) public data:any

  ) {
    this.createForm();
  }
  close(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    if (this.data.estado===true) {
        this.getById();
    }
  }

  getById() {
    this.marcasService.getById(this.data.id).subscribe((data)=>{
      this.form.patchValue({
        nombre: data.nombre
      })
    })
  }

  createForm() {
    this.form = this.fb.group({
      nombre:['', Validators.required]
    })
  }

  registerMarca(form: any) {
    this.submitted = true;
    this.loading = true;
    if (this.data.estado === true) {
      this.marcasService
        .update(this.data.id, form)
        .pipe(
          finalize(() => {
            this.form.markAsPristine();
            this.loading = false;
          })
        )
        .subscribe(
          data3 => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Marca Editada con exito',
              showConfirmButton: false,
              timer: 1500
            });
            this.dialogRef.close(data3)
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
      this.marcasService
      .create(form)
      .pipe(
        finalize(() => {
          this.form.markAsPristine();
          this.loading = false;
        })
        ).subscribe(
          data => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Marcas creada con exito',
              text: data.succes,
              showConfirmButton: false,
              timer: 1500
            });
            this.dialogRef.close(data);
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

