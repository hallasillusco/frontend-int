import { Component, Inject, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BannerService } from '@core/service/banner.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-banners',
  templateUrl: './crear-banners.component.html',
  styleUrl: './crear-banners.component.scss'
})
export class CrearBannersComponent implements OnInit{
  form!: FormGroup;
  submitted = false;
  isLoading = false;
  hide = true;
  imagen!: any;
  id: any;
  @Input() title!: string;
  @Input() objId!: string;
  @Input() estado!: boolean;
  
  constructor(
    public modal: NgbActiveModal,
    private fb:  FormBuilder,
    private bannerService: BannerService,
  ){
    this.createForm();
  }

  ngOnInit(): void {
    if(this.estado === true) {
      this.getById();
    }
  }

  createForm(){
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      file: ['']
    });
  }

  getById(){
    this.bannerService.getById(this.objId).subscribe(data =>{
      console.log(data);
      this.form.patchValue({
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
    formData.append('nombre',form.nombre);
    formData.append('descripcion',form.descripcion);
    if (this.imagen) {
      console.log(this.imagen);
      formData.append('file', this.imagen);
     }else{
      formData.append('file', '');
     }
    if(this.objId){
      formData.append("_method", "PUT");
      this.bannerService.updatePost(this.objId, formData).pipe(
        finalize(() => {
          this.form.markAsPristine();
          this.isLoading = false;
        })
      ).subscribe(
        dataE => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Banner editado con exito',
            showConfirmButton: false,
            timer: 1500
          });
          this.modal.close(dataE);
        },
        (error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
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
            title: 'Banner creado con exito',
            text: dataR.succes,
            showConfirmButton: false,
            timer: 1500
          });
          this.modal.close(dataR);
        },
        (error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.error,
          });
          this.submitted = false;
          this.isLoading = false;
        }
      );
    }
  }
}
