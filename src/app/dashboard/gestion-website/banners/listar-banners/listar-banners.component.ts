import { Component, EnvironmentProviders, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BannerService } from '@core/service/banner.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { CrearBannersComponent } from '../crear-banners/crear-banners.component';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-listar-banners',
  templateUrl: './listar-banners.component.html',
  styleUrl: './listar-banners.component.scss'
})
export class ListarBannersComponent implements OnInit {
  nombreColumnas: string[] = [
    'Nº',
    'Nombre',
    'File',
    'Descripcion',
    'Habilitado',
    'Acciones'
  ];

  form!: FormGroup;
  imagen!: any;
  public searching: boolean = false;
  paginado!: MatTableDataSource<any>;
  url=environment.imgUrl;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(
    private bannerService: BannerService,
    private fb: FormBuilder,
    private modalService: NgbModal
  ){

  }
  
  ngOnInit(): void {
    this.listaBanners();
  }

  listaBanners(){
    this.bannerService.getAll().subscribe((data: any)=>{
      this.paginado = new MatTableDataSource<any>(data);
      this.paginado.paginator = this.paginator;
    });
  }

  editModal(id: string) {
    const modal = this.modalService.open(
      CrearBannersComponent,
      {ariaLabelledBy: 'modal-basic-title'}
    );
    modal.componentInstance.objId = id;
    modal.componentInstance.estado = true;
    modal.componentInstance.title = 'Editar Banner';
    modal.result.then(result => {
      if (result) {
        this.listaBanners();
      }
    }).catch(error =>{});
  }
  create(){
    const modal = this.modalService.open(
      CrearBannersComponent,
      {ariaLabelledBy: 'modal-basic-title'}
    );
    modal.componentInstance.title = 'Crear Banner';
    modal.result.then(result=>{
      if (result){
        this.listaBanners();
      }
    }).catch(error =>{});
  }

  enableBanner(id: any) {
    this.bannerService.enableBanner(id).subscribe(
      (data: any) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Exito',
          text: data.success,
          showConfirmButton: false,
          timer: 1500
        })
        this.listaBanners();
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
        this.listaBanners();
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
        this.bannerService.delete(id).subscribe( (data: any) => {
          console.log(data);
          this.listaBanners();
          Swal.fire(
            'Eliminado!',
            'Registro eliminado.',
            'success'
          )
          this.listaBanners();
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
