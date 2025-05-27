import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { CrearProveedorComponent } from '../crear-proveedor/crear-proveedor.component';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Direction } from '@angular/cdk/bidi';
import { ProveedorService } from '@core/service/proveedor.service';


@Component({
  selector: 'app-lista-proveedor',
  templateUrl: './lista-proveedor.component.html',
  styleUrl: './lista-proveedor.component.scss'
})
export class ListaProveedorComponent implements OnInit {
  nombreColumnas: string[] = [
    'Nº',
    'Razon Social',
    'Nit',
    'Habilitado',
    'Acciones'
  ];

  proveedores: any;
  paginado!: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  dialogConfig?: MatDialogConfig;

  constructor(
    private dialog: MatDialog,
    private proveedorService: ProveedorService
  ) { }

  ngOnInit(): void {
    this.listaProveedores();
  }
  listaProveedores(){
    this.proveedorService.getAll().subscribe(data=>{
      this.paginado = new MatTableDataSource<any>(data);
      this.paginado.paginator = this.paginator;
    });
  }
  create(){
    const dialogRef = this.dialog.open(CrearProveedorComponent, {
      data: {
        estado: false,
        title: 'Nuevo Registro'
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.listaProveedores()
      }
    });
  }

  editar(id: any){
    const dialogRef = this.dialog.open(CrearProveedorComponent,{
      data: {
        estado: true,
        title: 'Editar Registro',
        id: id
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.listaProveedores()
      }
    });
  }

  delete(id: any){
    console.log(id);
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
        this.proveedorService.delete(id).subscribe( (data: any) => {
          console.log(data);
          this.listaProveedores();
          Swal.fire(
            'Eliminado!',
            'Registro eliminado.',
            'success'
          )
        },
        (error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Ocurrio un problema',
            text: error.error,
          });
        }
        );
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          'Cancelado',
          'Registro no eliminado',
          'error'
          )
        }
    })
  }

  applyFilters(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.paginado.filter = filterValue.trim().toLowerCase();
  }

  enableProveedor(id: any) {
    this.proveedorService.enableProveedor(id).subscribe(
      (data: any) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Exito',
          text: data.success,
          showConfirmButton: false,
          timer: 1500
        })
        this.listaProveedores();
      },
      error => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Error ',
          text: error.error,
          showConfirmButton: false,
          timer: 1500
        })
        this.listaProveedores();
      }
    );
  }
}
