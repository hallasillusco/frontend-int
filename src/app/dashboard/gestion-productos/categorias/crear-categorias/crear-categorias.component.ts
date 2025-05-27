import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TiposService } from '@core';
import { CategoriaService } from '@core/service/categoria.service';
import { finalize } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-categorias',
  templateUrl: './crear-categorias.component.html',
  styleUrl: './crear-categorias.component.scss'
})
export class CrearCategoriasComponent implements OnInit {
  form!: FormGroup;

  hide = true;
  submitted = false;
  loading = false;
  tipos: any;
  constructor(
    public dialogRef: MatDialogRef<CrearCategoriasComponent>,
    private fb: FormBuilder,
    private categoriaService: CategoriaService,
    private tipoService:TiposService,
    @Inject(MAT_DIALOG_DATA) private data:any
    ) {
      this.createForm();
    }

  close(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.listaTipos();
    if (this.data.estado === true)
      this.getById();
  }

  listaTipos() {
    this.tipoService.getEnabledList().subscribe(data=>{
      this.tipos = data
    });
  }

  getById(){
    this.categoriaService.getById(this.data.id).subscribe(data=>{
      console.log(data);
      this.form.patchValue({
        tipo_id:data.tipo_id,
        nombre:data.nombre
      });
    })
  }

  createForm(){
    this.form = this.fb.group({
      tipo_id:['',Validators.required],
      nombre: [
        '',
      [Validators.required, Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*')]],
    })
  }

  register(form: any){

    if(this.data.estado === true){
      this.categoriaService.update(this.data.id, form).pipe(
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
      this.categoriaService.create(form).pipe(finalize(() => {
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
