import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { WebsiteService } from '@core/service/website.service';
import { environment } from 'environments/environment';
import { finalize } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-verficacion-pedido',
  templateUrl: './verficacion-pedido.component.html',
  styleUrl: './verficacion-pedido.component.scss'
})
export class VerficacionPedidoComponent {
  numero:string='';
  telefono:string='';
  pedido: any;
  form!: FormGroup;
  imagen: any;
  url=environment.imgUrl
  constructor(
    private webService: WebsiteService,
    private fb: FormBuilder
  ) {
    // if (this.pedido) {
      this.form = this.fb.group({
        id: [''],
        file:['']
      })
    // }
  }

  busquedaPedido(){
    this.webService.getBusquedaPedido({
      'numero':this.numero,
      'celular':this.telefono
    }).subscribe(data=>{
        this.pedido=data;
    },
    error=>{
      Swal.fire({
        title: "Ocurrio un problema",
        text: error.error,
        icon: "error",
        position:'top-right'
      });
    })
  }

  agregarFoto(data: any){
    this.imagen = data.file;
    console.log(data)
   }

   guardarComprobante(form:any){
    const formData = new FormData();

    formData.append('id',this.pedido?.id);
    if (this.imagen) {
      console.log(this.imagen);
      formData.append('file', this.imagen);
     }else{
      formData.append('file', '');
     }

    if(this.pedido?.id){
      // formData.append("_method", "PUT");
      this.webService.postPedidoComprobante(formData).pipe(
        finalize(() => {
          this.form.markAsPristine();
          // this.loading = false;
        })
      ).subscribe(
        dataE => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Producto editado con exito',
            showConfirmButton: false,
            timer: 1500
          });
          this.busquedaPedido()
        },
        (error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Ocurrio un problema',
            text: error.error,
          });
          this.busquedaPedido()

        }
      );
      }

   }

}
