import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TiposService } from '@core';
import { CrearCategoriasComponent } from 'app/dashboard/gestion-productos/categorias/crear-categorias/crear-categorias.component';
import { finalize } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-tipos',
  templateUrl: './crear-tipos.component.html',
  styleUrl: './crear-tipos.component.scss'
})
export class CrearTiposComponent {
  form!: FormGroup;

  hide = true;
  submitted = false;
  loading = false;
  constructor(
    public dialogRef: MatDialogRef<CrearTiposComponent>,
    private fb: FormBuilder,
    private tiposService: TiposService,
    @Inject(MAT_DIALOG_DATA) private data:any
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

  getById(){
    this.tiposService.getById(this.data.id).subscribe(data=>{
      this.form.patchValue({nombre:data.nombre});
    })
  }

  createForm(){
    this.form = this.fb.group({
      nombre: [
        '',
      [Validators.required, Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*')]],
    })
  }

  register(form: any){

    if(this.data.estado === true){
      this.tiposService.update(this.data.id, form).pipe(
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
      this.tiposService.create(form).pipe(finalize(() => {
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
            title: 'Ocurrio un problema',
            text: error.error,            
          });
        }
      );
    }
  }
}
