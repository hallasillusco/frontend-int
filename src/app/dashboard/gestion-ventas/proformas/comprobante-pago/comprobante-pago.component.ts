import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProformasService, VentasService } from '@core';
import { environment } from 'environments/environment';
import { finalize } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-comprobante-pago',
  templateUrl: './comprobante-pago.component.html',
  styleUrl: './comprobante-pago.component.scss'
})
export class ComprobantePagoComponent {
  proforma: any;
  form!:FormGroup;
  loading: boolean= false;
  url=environment.imgUrl;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    private proformaService: ProformasService,
    public dialogRef: MatDialogRef<ComprobantePagoComponent>,
    private fb: FormBuilder,
    private ventaService: VentasService

  ) {
    this.createForm();
    this.getById();
  }

  createForm() {
    this.form = this.fb.group({
      proforma_id:['',Validators.required],
      id:['',Validators.required],
      monto:['',Validators.required]
    })
  }

  close(): void {
    this.dialogRef.close();
  }

  getById() {
    this.proformaService.getById(this.data.id).subscribe(data=>{
      this.proforma = data;
      this.form.patchValue({
        proforma_id: data.id,
        id: data?.comprobante?.id
      })
    })
  }

  
  submit(form:any){
 this.loading=true;
    this.proformaService.create(form);
    if (this.data.id) {
      this.ventaService.ventaProformasWeb(form)
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
          this.dialogRef.close(data);
        },
        (error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Ocurrio un problema',
            text: error.error,
          });
          this.loading=false;

        }
      );
    }
  }
  

}
