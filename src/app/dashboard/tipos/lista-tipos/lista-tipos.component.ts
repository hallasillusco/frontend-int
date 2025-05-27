import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TiposService } from '@core';
import Swal from 'sweetalert2';
import { CrearTiposComponent } from '../crear-tipos/crear-tipos.component';

@Component({
  selector: 'app-lista-tipos',
  templateUrl: './lista-tipos.component.html',
  styleUrl: './lista-tipos.component.scss'
})
export class ListaTiposComponent implements OnInit {
  nombreColumnas: string[] = [
    'Nº',
    'Nombre',
    'Habilitado',
    'Acciones'

  ];
  paginado!: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  dialogConfig?: MatDialogConfig;

  constructor(
    private dialog: MatDialog,
    private tiposService: TiposService
    ) { }

  ngOnInit(): void {
    this.listaTipos();
  }
  listaTipos(){
    this.tiposService.getAll().subscribe((data: any)=>{
      this.paginado = new MatTableDataSource<any>(data);
      this.paginado.paginator = this.paginator;
    });
  }

  create(){
    const dialogRef = this.dialog.open(CrearTiposComponent, {
      data: {
        estado: false,
        title: 'Nuevo Registro'
      },
    });
    
    dialogRef.afterClosed().subscribe((result) => {
      if (result){
      this.listaTipos();
      }
    });
  }

  editar(id: any){
    const dialogRef = this.dialog.open(CrearTiposComponent,{
      data: {
        estado: true,
        title: 'Editar Registro',
        id: id
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result){
        this.listaTipos()
      }
    });
  }

  applyFilters(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.paginado.filter = filterValue.trim().toLowerCase();
  }
    enableCategoria(id: any) {
      this.tiposService.enabled(id).subscribe(
        (data: any) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Exito',
            text: data.success,
            showConfirmButton: false,
            timer: 1500
          })
          this.listaTipos();
        },
        (error:any) => {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Error ',
            text: error.error,
            showConfirmButton: false,
            timer: 1500
          })
          this.listaTipos();
        }
      );
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
        this.tiposService.delete(id).subscribe( (data: any) => {
          console.log(data);
          this.listaTipos();
          Swal.fire(
            'Eliminado!',
            'Registro eliminado.',
            'success'
          )
          this.listaTipos();
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
          'La Categoria esta a salvo :)',
          'error'
          )
        }
    })
  }
}
