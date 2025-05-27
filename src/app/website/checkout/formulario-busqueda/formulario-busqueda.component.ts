import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientesService } from '@core';
import { finalize } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario-busqueda',
  templateUrl: './formulario-busqueda.component.html',
  styleUrl: './formulario-busqueda.component.scss'
})
export class FormularioBusquedaComponent {
  form!:FormGroup;
  public formSubmitted = false;
  @Output()data:EventEmitter<any> = new EventEmitter<any>();
 
  constructor(
    private fb: FormBuilder,
    private clienteService: ClientesService
  ) {
    this.form = this.fb.group({
      email:['',[Validators.required,Validators.email]],
      nit:['',Validators.required]
    })
        
  }

  busqueda(data:any){
    this.data.emit(data)
  }

  onSubmit(form:any) {
    if (this.form.valid) {
    this.formSubmitted = true;
          this.clienteService.busquedaClienteWeb(form)
          .pipe(
            finalize(() => {
    
              this.form.markAsPristine();              
            this.formSubmitted = false;
            })
          )
          .subscribe(data=>{
            this.busqueda(data)
          },
          error=>{
            this.formSubmitted = false; // Reset formSubmitted to false
            Swal.fire({
              title: "Ocurrio un problema",
              text: error.error,
              icon: "error"
            });
          }
          )

        } 
  }
}
