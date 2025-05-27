import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoriaService, TiposService } from '@core';
import { SubCategoriasService } from '@core/service/sub-categorias.service';
import { finalize } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-subcategoria',
  templateUrl: './crear-subcategoria.component.html',
  styleUrl: './crear-subcategoria.component.scss'
})
export class CrearSubcategoriaComponent implements OnInit {
  form!: FormGroup;

  hide = true;
  submitted = false;
  loading = false;
  categorias: any;
  tipos: any;
  constructor(
    public dialogRef: MatDialogRef<CrearSubcategoriaComponent>,
    private fb: FormBuilder,
    private subcategoriaService: SubCategoriasService,
    private categoriaService:CategoriaService,
    private tiposService:TiposService,
    @Inject(MAT_DIALOG_DATA) private data:any
    ) {
      this.createForm();
    }

  close(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.listaTipos();
    this.form.get("tipo_id")?.valueChanges.subscribe(data=>{
      this.listaCategorias(data);
    })
    if (this.data.estado === true)
      this.getById();
  }

  listaTipos() {
    this.tiposService.getEnabledList().subscribe(data=>{
      this.tipos = data
    });
  }

  listaCategorias(id:any) {
    this.categoriaService.tipos(id).subscribe(data=>{
      this.categorias = data
    });
  }

  getById(){
    this.subcategoriaService.getById(this.data.id).subscribe(data=>{
      console.log(data);
      this.form.patchValue({
        categoria_id:data.categoria_id,
        nombre:data.nombre
      });
    })
  }

  createForm(){
    this.form = this.fb.group({
      tipo_id:['',Validators.required],
      categoria_id:['',Validators.required],
      nombre: [
        '',
      [Validators.required, Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*')]],
    })
  }

  register(form: any){

    if(this.data.estado === true){
      this.subcategoriaService.update(this.data.id, form).pipe(
        finalize(() => {
          this.form.markAsPristine();
        })
      ).subscribe(
        dataE => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Registro creado con exito',
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
      this.subcategoriaService.create(form).pipe(finalize(() => {
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
