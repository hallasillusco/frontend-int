import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BlogsService } from '@core/service/blogs.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { CrearBlogsComponent } from '../crear-blogs/crear-blogs.component';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-lista-blogs',
  templateUrl: './lista-blogs.component.html',
  styleUrl: './lista-blogs.component.scss'
})
export class ListaBlogsComponent implements OnInit {
  nombreColumnas: string[] = [
    'Nº',
    'Imagen',
    'Tipo',
    'Nombre',
    'Descripcion',
    'Habilitado',
    'Acciones'
  ];
  url = environment.imgUrl;

  paginado!: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(
    private blogService:BlogsService,
    private dialog: MatDialog,
    private sanitizer: DomSanitizer    
  ){

  }
  
  ngOnInit(): void {
    this.listaBlogs();
  }

  listaBlogs(){
    this.blogService.getAll().subscribe((data: any)=>{
      this.paginado = new MatTableDataSource<any>(data);
      this.paginado.paginator = this.paginator;
    });
  }
  
  public createTrustedHtml(blogContent: string) {
    return this.sanitizer.bypassSecurityTrustHtml(blogContent);
 }

  create(){
    const dialogRef = this.dialog.open(CrearBlogsComponent, {
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
    const dialogRef = this.dialog.open(CrearBlogsComponent, {
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
    this.blogService.enabled(id).subscribe(
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
        this.blogService.delete(id).subscribe( (data: any) => {
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
