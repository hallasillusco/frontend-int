import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '@core/service/user.service';
import { finalize } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-usuarios',
  templateUrl: './crear-usuarios.component.html',
  styleUrl: './crear-usuarios.component.scss'
})
export class CrearUsuariosComponent implements OnInit {

  form!: FormGroup;
  hide = true;
  roles: any;
  submitted = false;
  loading = false;

  constructor(
    public dialogRef: MatDialogRef<CrearUsuariosComponent>,
    private fb: FormBuilder,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) private data:any

  ) {
    this.createForm();
  }
  close(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.listaRoles();
    if (this.data.estado===true) {
        this.getById();
    }
  }

  getById() {
    this.userService.getById(this.data.id).subscribe(data=>{
      this.form.patchValue({
        username: data.username,
        password: '',
        email: data.email,
        nombres: data.nombres,
        apellidos: data.apellidos,
        ci: data.ci,
        celular: data.celular,
        rol_id: data.rol_id
      })

    })
  }

  listaRoles() {
    this.userService.getAllRoles().subscribe(data=>{
      this.roles = data;
    })
  }

  createForm() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: [''],
      email: ['', [Validators.email]],
      nombres: ['',[Validators.required, Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*')]
      ],
      apellidos: ['',[Validators.required, Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*')]
      ],
      ci: ['',Validators.required],
      celular: ['',
        [
          Validators.required,
          Validators.maxLength(8),
          Validators.pattern('[0-9]*')
        ]
      ],
      rol_id:['', Validators.required]
    })
  }

  registerUser(form: any) {
    this.submitted = true;
    this.loading = true;
    if (this.data.estado === true) {
      this.userService
        .update(this.data.id, form)
        .pipe(
          finalize(() => {
            this.form.markAsPristine();
            this.loading = false;
          })
        )
        .subscribe(
          data3 => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Usuario Editado con exito',
              showConfirmButton: false,
              timer: 1500
            });
            this.dialogRef.close(data3)
          },
          (error: any) => {
            Swal.fire({
              icon: 'error',
              title: 'Ocurrio un problema',
              text: error.error,
            });
            this.submitted = false;
            this.loading = false;
          }
        );
    } else {
      this.userService
      .create(form)
      .pipe(
        finalize(() => {
          this.form.markAsPristine();
          this.loading = false;
        })
        ).subscribe(
          data => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Usuario creado con exito',
              text: data.succes,
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
            this.submitted = false;
            this.loading = false;
          }
        );
    }
  }



}
