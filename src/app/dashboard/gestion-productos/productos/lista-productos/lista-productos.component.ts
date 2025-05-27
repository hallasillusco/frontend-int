import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { CrearProductosComponent } from '../crear-productos/crear-productos.component';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Direction } from '@angular/cdk/bidi';
import { ProductoService } from '@core';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrl: './lista-productos.component.scss'
})
export class ListaProductosComponent implements OnInit {
  nombreColumnas: string[] = [
    'Nº',
    'File',
    'Nombre',
    'Código',
    'Precio Unit',
    'Unidad',
    'Tipo',
    'Categoría',
    'Subcategoria',
    'Destacar',
    'Habilitado',
    'Acciones'
  ];

  paginado!: MatTableDataSource<any>;
  url=environment.imgUrl;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(
    private productoService: ProductoService
  ) { }

  ngOnInit(): void {
    this.listaProductos();
  }
  listaProductos(){
    this.productoService.getAll().subscribe(data=>{
      this.paginado = new MatTableDataSource<any>(data);
      this.paginado.paginator = this.paginator;
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
      confirmButtonText: 'Si, borrarlo!',
      cancelButtonText: 'No, cancelar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.productoService.delete(id).subscribe( (data: any) => {
          console.log(data);
          this.listaProductos();
          Swal.fire(
            'Eliminado!',
            'Registro eliminado.',
            'success'
          )
        },
        (error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.error,
          });
        }
        );
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          'Cancelado',
          'Producto No Eliminado',
          'error'
          )
        }
    })
  }

  applyFilters(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.paginado.filter = filterValue.trim().toLowerCase();
  }

  enableProducto(id: any) {
    this.productoService.enableProducto(id).subscribe(
      (data: any) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Exito',
          text: data.success,
          showConfirmButton: false,
          timer: 1500
        })
        this.listaProductos();
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
        this.listaProductos();
      }
    );
  }

  destacarProducto(id: any) {
    this.productoService.destacarProducto(id).subscribe(
      (data: any) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Exito',
          text: data.success,
          showConfirmButton: false,
          timer: 1500
        })
        this.listaProductos();
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
        this.listaProductos();
      }
    );
  }
}
