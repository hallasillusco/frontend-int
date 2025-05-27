import { Component, OnInit, ViewChild } from '@angular/core';
import { VideosService } from '@core/service/videos.service';
import { CrearVideosComponent } from '../crear-videos/crear-videos.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-videos',
  templateUrl: './lista-videos.component.html',
  styleUrl: './lista-videos.component.scss'
})
export class ListaVideosComponent implements OnInit {
  nombreColumnas: string[] = [
    'Nº',
    'Nombre',
    'Videos',
    'Habilitado',
    'Acciones'
  ];

  paginado!: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(
    private videosService: VideosService,
    private dialog: MatDialog,
    private sanitizer: DomSanitizer    
  ){

  }
  
  ngOnInit(): void {
    this.listaBlogs();
  }

  listaBlogs(){
    this.videosService.getAll().subscribe((data: any)=>{
      this.paginado = new MatTableDataSource<any>(data);
      this.paginado.paginator = this.paginator;
    });
  }
  
  public createTrustedHtml(blogContent: string) {
    return this.sanitizer.bypassSecurityTrustHtml(blogContent);
 }

  create(){
    const dialogRef = this.dialog.open(CrearVideosComponent, {
      data: {
        estado: false,
        title: 'Nuevo Registro'
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.listaBlogs();
      }
    });
  }

  editar(id:any){
    const dialogRef = this.dialog.open(CrearVideosComponent, {
      data: {
        estado: true,
        title: 'Editar Registro',
        id: id
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.listaBlogs();
      }
    });
  }

  enableBanner(id: any) {
    this.videosService.enabled(id).subscribe(
      (data: any) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Exito',
          text: data.success,
          showConfirmButton: false,
          timer: 1500
        })
        this.listaBlogs();
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
        this.listaBlogs();
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
        this.videosService.delete(id).subscribe( (data: any) => {
          console.log(data);
          this.listaBlogs();
          Swal.fire(
            'Eliminado!',
            'Registro eliminado.',
            'success'
          )
          this.listaBlogs();
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

  

  applyFilters(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.paginado.filter = filterValue.trim().toLowerCase();
  }
}
