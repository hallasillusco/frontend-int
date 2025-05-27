import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SubCategoriasService } from '@core/service/sub-categorias.service';
import Swal from 'sweetalert2';
import { CrearSubcategoriaComponent } from '../crear-subcategoria/crear-subcategoria.component';

@Component({
  selector: 'app-lista-subcategoria',
  templateUrl: './lista-subcategoria.component.html',
  styleUrl: './lista-subcategoria.component.scss'
})
export class ListaSubcategoriaComponent implements OnInit {
  nombreColumnas: string[] = [
    'Nº',
    'Tipos',
    'Categorias',
    'Nombre',
    'Habilitado',
    'Acciones'

  ];
  paginado!: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  dialogConfig?: MatDialogConfig;

  constructor(
    private dialog: MatDialog,
    private subcategoriaService: SubCategoriasService
    ) { }

  ngOnInit(): void {
    this.listaCategorias();
  }
  listaCategorias(){
    this.subcategoriaService.getAll().subscribe((data: any)=>{
      this.paginado = new MatTableDataSource<any>(data);
      this.paginado.paginator = this.paginator;
    });
  }

  create(){
    const dialogRef = this.dialog.open(CrearSubcategoriaComponent, {
      data: {
        estado: false,
        title: 'Nuevo Registro'
      },
    });
    
    dialogRef.afterClosed().subscribe((result) => {
      if (result){
      this.listaCategorias();
      }
    });
  }

  editar(id: any){
    const dialogRef = this.dialog.open(CrearSubcategoriaComponent,{
      data: {
        estado: true,
        title: 'Editar Registro',
        id: id
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result){
        this.listaCategorias()
      }
    });
  }

  applyFilters(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.paginado.filter = filterValue.trim().toLowerCase();
  }
    enableCategoria(id: any) {
      this.subcategoriaService.enabled(id).subscribe(
        (data: any) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Exito',
            text: data.success,
            showConfirmButton: false,
            timer: 1500
          })
          this.listaCategorias();
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
          this.listaCategorias();
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
        this.subcategoriaService.delete(id).subscribe( (data: any) => {
          console.log(data);
          this.listaCategorias();
          Swal.fire(
            'Eliminado!',
            'Registro eliminado.',
            'success'
          )
          this.listaCategorias();
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
