import { Component, Inject, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClientesService } from '@core/service/clientes.service';
import { TipoClientesService } from '@core/service/tipo-clientes.service';
import { finalize } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-clientes',
  standalone: false,
  templateUrl: './crear-clientes.component.html',
  styleUrl: './crear-clientes.component.scss'
})
export class CrearClientesComponent implements OnInit {
  form!: FormGroup;
  tipos: any;
  loading = false;

  constructor(
    public dialogRef: MatDialogRef<CrearClientesComponent>,
    private fb: FormBuilder,
    private clientesService: ClientesService,
    private tipoService: TipoClientesService,
    @Inject(MAT_DIALOG_DATA) private data:any
    ) {
      this.createForm();
    }

  close(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.listaTipoCliente();

    if (this.data.estado === true)
      this.getById();
  }

  listaTipoCliente() {
    this.tipoService.getEnabledList().subscribe(data=>{
      this.tipos = data
    })
  }


    getById() {
      this.clientesService.getById(this.data.id).subscribe(data=>{
        this.form.patchValue({
          razon_social: data.razon_social,
          nombre_completo: data.nombre_completo,
          nit: data.nit,
          celular: data.celular,
          direccion: data.direccion,
          email: data.email,
          tipo_cliente_id: data.tipo_cliente_id,
        })
      })
  }

  createForm() {
    this.form = this.fb.group({
      razon_social: ['', Validators.required],
      nombre_completo: ['', Validators.required],
      nit: ['', Validators.required],
      celular: ['',
        [
          Validators.required,
          Validators.maxLength(8),
          Validators.pattern('[0-9]*')
        ]
      ],
      direccion: ['', Validators.required],
      email: ['', Validators.email],
      tipo_cliente_id: ['', Validators.required],
    })
  }

  register(form: any){
    this.loading = true
    if(this.data.estado === true){
      this.clientesService.update(this.data.id, form).pipe(
        finalize(() => {
          this.form.markAsPristine();
          this.loading = false
        })
      ).subscribe(
        dataE => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Cliente editado con exito',
            showConfirmButton: false,
            timer: 1500
          });
          this.dialogRef.close(dataE);
        },
        (error: any) => {
          this.loading = false

          Swal.fire({
            icon: 'error',
            title: 'Error Al Editar',
            text: error.error,
          });
        }
      );
    } else {
      this.clientesService.create(form).pipe(finalize(() => {
        this.form.markAsPristine();
        this.loading = false

      })
      )
      .subscribe(
        dataR => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Cliente creado con exito',
            text: dataR.succes,
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
          this.loading = false

        }
      );
    }
  }
}
