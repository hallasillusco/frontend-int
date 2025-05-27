import { Component, Inject, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogsService } from '@core/service/blogs.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from 'rxjs';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-crear-blogs',
  templateUrl: './crear-blogs.component.html',
  styleUrl: './crear-blogs.component.scss'
})
export class CrearBlogsComponent implements OnInit {
  
  form!: FormGroup;
  submitted = false;
  isLoading = false;
  hide = true;
  imagen!: any;
  public Editor: any = ClassicEditor;
  tipos: any;
  
  constructor(
    private fb:  FormBuilder,
    private bannerService: BlogsService,
    public dialogRef: MatDialogRef<CrearBlogsComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ){
    this.listaTipos();
    this.createForm();
  }

  ngOnInit(): void {
    if(this.data.estado === true) {
      this.getById();
    }
  }

  listaTipos() {
    this.bannerService.getTipos().subscribe(data=>{
      this.tipos = data;
    })
  }

  createForm(){
    this.form = this.fb.group({
      tipo_blog_id: ['', Validators.required],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      file: ['']
    });
  }

  getById(){
    this.bannerService.getById(this.data.id).subscribe(data =>{
      console.log(data);
      this.form.patchValue({
        tipo_blog_id: data.tipo_blog_id,
        nombre: data.nombre,
        descripcion: data.descripcion,
        file: data.file
      });
    })
  }

  agregarFoto(data: any){
    this.imagen = data.file;
    console.log(data)
   }

  register(form: any){
    this.submitted = true;
    this.isLoading = true
    const formData = new FormData();
    formData.append('tipo_blog_id',form.tipo_blog_id);
    formData.append('nombre',form.nombre);
    formData.append('descripcion',form.descripcion);
    if (this.imagen) {
      console.log(this.imagen);
      formData.append('file', this.imagen);
     }else{
      formData.append('file', '');
     }
    if(this.data.id){
      formData.append("_method", "PUT");
      this.bannerService.updatePost(this.data.id, formData).pipe(
        finalize(() => {
          this.form.markAsPristine();
          this.isLoading = false;
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
          this.dialogRef.close(dataE)

        },
        (error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Ocurrio un problema',
            text: error.error,
          });
          this.submitted = false;
          this.isLoading = false;
        }
      );
    } else {
      this.bannerService.create(formData).pipe(finalize(() => {
        this.form.markAsPristine();
        this.isLoading = false;
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
          this.dialogRef.close(dataR)

        },
        (error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Ocurrio un problema',
            text: error.error,
          });
          this.submitted = false;
          this.isLoading = false;
        }
      );
    }
  }
}
