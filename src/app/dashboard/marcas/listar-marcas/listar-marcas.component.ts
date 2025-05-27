import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MarcasService } from '@core/service/marcas.service';
import { CrearMarcasComponent } from '../crear-marcas/crear-marcas.component';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-listar-marcas',
    templateUrl: './listar-marcas.component.html',
    styleUrl: './listar-marcas.component.scss',

})
export class ListarMarcasComponent implements OnInit{
  nombreColumnas: string[] = [
    'Nº',
    'Nombre',
    'Habilitado',
    'Acciones'
  ];
  paginado!: MatTableDataSource<any>;

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private marcasService : MarcasService
  ){ }


  ngOnInit(): void {
    this.listaMarcas();
  }
  listaMarcas(){
    this.marcasService.getAll().subscribe((data: any)=>{
      this.paginado = new MatTableDataSource<any>(data);
      this.paginado.paginator = this.paginator;
    });
  }
  create(){
    const dialogRef = this.dialog.open(CrearMarcasComponent,{
      data: {
        estado: false,
        title:'Nuevo Registro'
      }
    });
    dialogRef.afterClosed().subscribe((result)=>{
      if (result){
        this.listaMarcas();
  }
});
  }
  editar(id: any){
    const dialogRef = this.dialog.open(CrearMarcasComponent,{
      data: {
        estado: true,
        title: 'Editar',
        id: id
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result){
        this.listaMarcas()
      }
    });
  }

  applyFilters(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.paginado.filter = filterValue.trim().toLowerCase();
  }
    enabledMarcas(id: any) {
      this.marcasService.enabled(id).subscribe(
        (data: any) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Exito',
            text: data.success,
            showConfirmButton: false,
            timer: 1500
          })
          this.listaMarcas();
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
          this.listaMarcas();
        }
      );
    }

  deleteMarcas(id: any){
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
        this.marcasService.delete(id).subscribe( (data: any) => {
          console.log(data);
          this.listaMarcas();
          Swal.fire(
            'Eliminado!',
            'Registro eliminado.',
            'success'
          )
          this.listaMarcas();
        },
        );
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          'Cancelado',
          )
        }
    })
  }
}
