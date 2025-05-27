import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AyudaService } from '@core/service/ayuda.service';
import Swal from 'sweetalert2';
import { CrearAyudaComponent } from '../crear-ayuda/crear-ayuda.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-listar-ayuda',
  templateUrl: './listar-ayuda.component.html',
  styleUrl: './listar-ayuda.component.scss'
})
export class ListarAyudaComponent implements OnInit{
  nombreColumnas: string[] = [
    'Nº',
    'Nombre',
    'Habilitado',
    'Acciones',

  ];

  clientes: any
  paginado!: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  dialogConfig?: MatDialogConfig;

  constructor(
    private dialog: MatDialog,
    private ayudaService: AyudaService
    ) { }

    ngOnInit(): void {
      this.listaAyuda();
    }
    listaAyuda() {
        this.ayudaService.getAll().subscribe((data: any)=>{
          this.paginado = new MatTableDataSource<any>(data);
          this.paginado.paginator = this.paginator;
        });
      }


  create(){
    const dialogRef = this.dialog.open(CrearAyudaComponent, {
      data: {
        estado: false,
        title: 'Nuevo Registro'
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result){
      this.listaAyuda();
      }
    });
  }

  editar(id: any){
    const dialogRef = this.dialog.open(CrearAyudaComponent,{
      data: {
        estado: true,
        title: 'Editar Registro',
        id: id
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result){
        this.listaAyuda();
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
        this.ayudaService.delete(id).subscribe( (data: any) => {
          console.log(data);
          this.listaAyuda();
          Swal.fire(
            'Eliminado!',
            'Registro eliminado.',
            'success'
          )
          this.listaAyuda();
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
      this.ayudaService.enabled(id).subscribe(
        (data: any) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Exito',
            text: data.success,
            showConfirmButton: false,
            timer: 1500
          })
          this.listaAyuda();
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
          this.listaAyuda();
        }
      );
    }
}
