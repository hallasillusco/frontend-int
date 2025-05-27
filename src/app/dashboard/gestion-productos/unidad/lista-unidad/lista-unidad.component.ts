import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { UnidadService } from '@core/service/unidad.service';
import { CrearUnidadComponent } from '../crear-unidad/crear-unidad.component';

@Component({
    selector: 'app-lista-unidad',
    standalone: false,
    templateUrl: './lista-unidad.component.html',
    styleUrl: './lista-unidad.component.scss',
})

export class ListaUnidadComponent implements OnInit {
  nombreColumnas: string[] = [
    'Nº',
    'Nombre',
    'Sigla',
    'Habilitado',
    'Acciones'

  ];

  paginado!: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  dialogConfig?: MatDialogConfig;

  constructor(
    private dialog: MatDialog,
    private unidadService: UnidadService
    ) { }

    ngOnInit(): void {
      this.listaUnidad();
    }
    listaUnidad() {
        this.unidadService.getAll().subscribe((data: any)=>{
          this.paginado = new MatTableDataSource<any>(data);
          this.paginado.paginator = this.paginator;
        });
      }


  create(){
    const dialogRef = this.dialog.open(CrearUnidadComponent, {
      data: {
        estado: false,
        title: 'Nuevo Registro'
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result){
      this.listaUnidad();
      }
    });
  }

  editar(id: any){
    const dialogRef = this.dialog.open(CrearUnidadComponent,{
      data: {
        estado: true,
        title: 'Editar Registro',
        id: id
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result){
        this.listaUnidad()
      }
    });
  }

  applyFilters(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.paginado.filter = filterValue.trim().toLowerCase();
  }

    enableUnidad(id: any) {
      this.unidadService.enabled(id).subscribe(
        (data: any) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Exito',
            text: data.success,
            showConfirmButton: false,
            timer: 1500
          })
          this.listaUnidad();
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
          this.listaUnidad();
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
        this.unidadService.delete(id).subscribe( (data: any) => {
          console.log(data);
          this.listaUnidad();
          Swal.fire(
            'Eliminado!',
            'Registro eliminado.',
            'success'
          )
          this.listaUnidad();
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
          'La Unidad esta a salvo :)',
          'error'
          )
        }
    })
  }
}
