import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { ConfiguracionService } from '@core/service/configuracion.service';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { FileUploadComponent } from '@shared/components/file-upload/file-upload.component';
import { WebMaterialModule } from 'app/webmaterial.module';
import { environment } from 'environments/environment';
import { finalize } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [
    CommonModule,
    BreadcrumbComponent,
    FileUploadComponent,
    WebMaterialModule,
    ReactiveFormsModule,
    FormsModule
],
  templateUrl: './configuracion.component.html',
  styleUrl: './configuracion.component.scss'
})
export class ConfiguracionComponent {
  form!: FormGroup;
  data: any;
  loading: boolean =false ;
  imagen: any;
  url =  environment.imgUrl;
  constructor(
    private configService:ConfiguracionService,
    private fb: FormBuilder,
  ) {

    this.control();
    this.getConfig();
  }

  getConfig() {
    this.configService.getAll().subscribe(data=>{
      this.data = data;
      this.form.patchValue({
        razon_social: data.razon_social,
        direccion: data.direccion,
        telefono: data.telefono,
        pago_bancario: data.pago_bancario==1?true:false,
        pago_qr: data.pago_qr==1?true:false
      })
      
    })
  }

  agregarFoto(data: any){
    this.imagen = data.file;
    console.log(data)
   }

  control() {
    this.form = this.fb.group({
      razon_social:[''],
      direccion:[''],
      telefono:[''],
      pago_bancario:[''],
      pago_qr:[''],
      file:['']
    })
  }

  guardar(form:any){

    const formData = new FormData();

    formData.append('razon_social',form.razon_social);
    formData.append('direccion',form.direccion);
    formData.append('telefono',form.telefono);
    formData.append('pago_bancario',form.pago_bancario);
    formData.append('pago_qr',form.pago_qr);

    if (this.imagen) {
      console.log(this.imagen);
      formData.append('file', this.imagen);
     }else{
      formData.append('file', '');
     }

    this.configService.create(form)
      .pipe(
        finalize(() => {

          this.form.markAsPristine();
          this.loading=false;
        })
      )
      .subscribe(
        data => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: data.success,
            showConfirmButton: false,
            timer: 1500
          });
          this.getConfig();
        },
        (error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Ocurrio un problema',
            text: error.error,
          });
          this.loading=false;
          this.getConfig();

        }
      );
  }

}
