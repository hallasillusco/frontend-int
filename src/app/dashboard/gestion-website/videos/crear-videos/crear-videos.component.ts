import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VideosService } from '@core/service/videos.service';
import { finalize } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-videos',
  templateUrl: './crear-videos.component.html',
  styleUrl: './crear-videos.component.scss'
})
export class CrearVideosComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  isLoading = false;
 
  
  constructor(
    private fb:  FormBuilder,
    private bannerService: VideosService,
    public dialogRef: MatDialogRef<CrearVideosComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ){
    this.createForm();
  }

  ngOnInit(): void {
    if(this.data.estado === true) {
      this.getById();
    }
  }

  createForm(){
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      link: ['', Validators.required],
    });
  }

  getById(){
    this.bannerService.getById(this.data.id).subscribe(data =>{
      console.log(data);
      this.form.patchValue({
        nombre: data.nombre,
        link: data.link,
      });
    })
  }


  register(form: any){
    this.submitted = true;
    this.isLoading = true;

    if(this.data.id){
      this.bannerService.update(this.data.id, form).pipe(
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
      this.bannerService.create(form).pipe(finalize(() => {
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
