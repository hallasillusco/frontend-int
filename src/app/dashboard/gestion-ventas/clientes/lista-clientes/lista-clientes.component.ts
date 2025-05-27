import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ClientesService } from '@core';
import { CrearClientesComponent } from '../crear-clientes/crear-clientes.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-clientes',
  standalone: false,
  templateUrl: './lista-clientes.component.html',
  styleUrl: './lista-clientes.component.scss'
})
export class ListaClientesComponent implements OnInit {
  nombreColumnas: string[] = [
    'Nº',
    'Razon_Social',
    'Nombre_Completo',
    'Nit',
    'Celular',
    'Direccion',
    'Email',
    'Tipo Cliente',
    'Habilitado',
    'Acciones',

  ];

  clientes: any
  paginado!: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  dialogConfig?: MatDialogConfig;

  constructor(
    private dialog: MatDialog,
    private clientesService: ClientesService
    ) { }

    ngOnInit(): void {
      this.listaClientes();
    }
    listaClientes() {
        this.clientesService.getAll().subscribe((data: any)=>{
          this.paginado = new MatTableDataSource<any>(data);
          this.paginado.paginator = this.paginator;
        });
      }


  create(){
    const dialogRef = this.dialog.open(CrearClientesComponent, {
      data: {
        estado: false,
        title: 'Nuevo Registro'
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result){
      this.listaClientes();
      }
    });
  }

  editar(id: any){
    const dialogRef = this.dialog.open(CrearClientesComponent,{
      data: {
        estado: true,
        title: 'Editar Registro',
        id: id
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result){
        this.listaClientes();
      }
    });
  }

  delete(id: any){
    Swal.fire({
      title: '¿Está seguro?',
      text: "¡Esta acción no podrá revertirce!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'primary',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, bórralo!',
      cancelButtonText: 'No, cancelar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.clientesService.delete(id).subscribe( (data: any) => {
          console.log(data);
          this.listaClientes();
          Swal.fire(
            'Eliminado!',
            'Registro eliminado.',
            'success'
          )
          this.listaClientes();
        },
        (error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo salió mal!'
          });
        }
        );
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          'Cancelado',
          'Error al eliminar',
          'error'
          )
        }
    });
  }
  applyFilters(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.paginado.filter = filterValue.trim().toLowerCase();
  }
    enableClientes(id: any) {
      this.clientesService.enabled(id).subscribe(
        (data: any) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Exito',
            text: data.success,
            showConfirmButton: false,
            timer: 1500
          })
          this.listaClientes();
        },
        (error:any) => {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Error',
            text: error.error,
            showConfirmButton: false,
            timer: 1500
          })
          this.listaClientes();
        }
      );
    }
}
