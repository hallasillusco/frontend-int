import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AyudaService } from '@core/service/ayuda.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { finalize } from 'rxjs';
import Swal from 'sweetalert2';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-crear-ayuda',
  templateUrl: './crear-ayuda.component.html',
  styleUrls: ['./crear-ayuda.component.scss']
})
export class CrearAyudaComponent implements OnInit {
  form!: FormGroup;
  public Editor: any = ClassicEditor;
  loading = false;

  constructor(
    public dialogRef: MatDialogRef<CrearAyudaComponent>,
    private fb: FormBuilder,
    private ayudaService: AyudaService,
    @Inject(MAT_DIALOG_DATA) public data:any
    ) {
      this.createForm();
    }

  close(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    if (this.data.estado === true)
      this.getById();
  }


    getById() {
      this.ayudaService.getById(this.data.id).subscribe(data=>{
        this.form.patchValue({
          nombre: data.nombre,
          descripcion: data.descripcion,
        })
      })
  }

  createForm() {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
    })
  }

  register(form: any){
    this.loading = true;

    if(this.data.estado === true){
      this.ayudaService.update(this.data.id, form).pipe(
        finalize(() => {
          this.form.markAsPristine();
          this.loading = false;
        })
      ).subscribe(
        dataE => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Exito',
            text: dataE.success,
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
      this.ayudaService.create(form).pipe(finalize(() => {
        this.form.markAsPristine();
        this.loading = false;

      })
      )
      .subscribe(
        dataR => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Exito',
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
        }
      );
    }
  }
}
