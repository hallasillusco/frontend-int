import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TipoClientesService } from '@core/service/tipo-clientes.service';
import { CrearTipoClienteComponent } from '../crear-tipo-cliente/crear-tipo-cliente.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-tipo-cliente',
  templateUrl: './listar-tipo-cliente.component.html',
  styleUrl: './listar-tipo-cliente.component.scss'
})
export class ListarTipoClienteComponent implements OnInit {
  nombreColumnas: string[] = [
    'Nº',
    'Nombre',
    'Descuento',
    // 'Tipo Cliente',
    'Habilitado',
    'Acciones',

  ];

  paginado!: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  dialogConfig?: MatDialogConfig;

  constructor(
    private dialog: MatDialog,
    private tipoclientesService: TipoClientesService
    ) { }

    ngOnInit(): void {
      this.listaTipoClientes();
    }
    listaTipoClientes() {
        this.tipoclientesService.getAll().subscribe((data: any)=>{
          this.paginado = new MatTableDataSource<any>(data);
          this.paginado.paginator = this.paginator;
        });
      }


  create(){
    const dialogRef = this.dialog.open(CrearTipoClienteComponent, {
      data: {
        estado: false,
        title: 'Nuevo Registro'
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result){
      this.listaTipoClientes();
      }
    });
  }

  editar(id: any){
    const dialogRef = this.dialog.open(CrearTipoClienteComponent,{
      data: {
        estado: true,
        title: 'Editar Registro',
        id: id
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result){
        this.listaTipoClientes();
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
        this.tipoclientesService.delete(id).subscribe( (data: any) => {
          console.log(data);
          this.listaTipoClientes();
          Swal.fire(
            'Eliminado!',
            'Registro eliminado.',
            'success'
          )
          this.listaTipoClientes();
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
      this.tipoclientesService.enabled(id).subscribe(
        (data: any) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Exito',
            text: data.success,
            showConfirmButton: false,
            timer: 1500
          })
          this.listaTipoClientes();
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
          this.listaTipoClientes();
        }
      );
    }
}
