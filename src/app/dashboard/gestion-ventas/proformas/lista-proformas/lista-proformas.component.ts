/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProformasService } from '@core/service/proformas.service';
import { UserService } from '@core/service/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImprimirPdfComponent } from '@shared/components/imprimir-pdf/imprimir-pdf.component';
import { Subject, debounceTime, filter, takeUntil, tap } from 'rxjs';

import Swal from 'sweetalert2';
import { ComprobantePagoComponent } from '../comprobante-pago/comprobante-pago.component';

@Component({
  selector: 'app-lista-proformas',
  templateUrl: './lista-proformas.component.html',
  styleUrl: './lista-proformas.component.scss'
})
export class ListaProformasComponent implements OnInit {
  nombreColumnas: string[] = [
    'Nº',
    'Web',
    'Usuario',
    'Cliente',
    'Fecha-Registro',
    'Total',
    'Acciones'
  ];

  form!: any;
  proformas!: any;
  usuarios!: any;
  public searching: boolean = false;
  paginado!: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;


  constructor(
    private proformasService: ProformasService,
    private modalService: NgbModal,
    private dialog: MatDialog    

    ) { }

    ngOnInit(): void {
      this.listaProformas();
    }

    listaProformas(filters?:any) {
      this.form = filters;
      this.proformasService.getAll({
        'user_id':filters?.user_id,
        'fecha_inicio':filters?.fecha_inicio,
        'fecha_fin':filters?.fecha_fin
      }).subscribe((data: any)=>{
        this.paginado = new MatTableDataSource<any>(data);
        this.paginado.paginator = this.paginator;
      });
    }

    enableProformas(id: any) {
      this.proformasService.enabled(id).subscribe(
        (data: any) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Exito',
            text: data.success,
            showConfirmButton: false,
            timer: 1500
          })
          this.listaProformas(
            {
              'user_id':this.form?.user_id,
              'fecha_inicio':this.form?.fecha_inicio,
              'fecha_fin':this.form?.fecha_fin
            }
          );
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
          this.listaProformas(
            {
              'user_id':this.form?.user_id,
              'fecha_inicio':this.form?.fecha_inicio,
              'fecha_fin':this.form?.fecha_fin
            }
          );
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
        this.proformasService.delete(id).subscribe( (data: any) => {
          console.log(data);
          this.listaProformas(
              {
              'user_id':this.form?.user_id,
              'fecha_inicio':this.form?.fecha_inicio,
              'fecha_fin':this.form?.fecha_fin
            }
          );
          Swal.fire(
            'Eliminado!',
            'Registro eliminado.',
            'success'
          )
          this.listaProformas(
              {
              'user_id':this.form?.user_id,
              'fecha_inicio':this.form?.fecha_inicio,
              'fecha_fin':this.form?.fecha_fin
            }
          );
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
  imprimir(id: any){
    this.proformasService.getProformasPDF(id).subscribe((res: any) => {
      const file = new Blob([res], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);

      const modal = this.modalService.open(ImprimirPdfComponent, {size:'lg'});
      modal.componentInstance.estado = true;
      modal.componentInstance.title = 'Vista previa del Reporte';
      modal.componentInstance.pdfRuta = fileURL;
      modal.result.then((result: any) => {
        if (result) {
          this.listaProformas(  {
            'user_id':this.form?.user_id,
            'fecha_inicio':this.form?.fecha_inicio,
            'fecha_fin':this.form?.fecha_fin
          });
        }
      });
    });
  }

  comprobante(id: any){
    const dialogRef = this.dialog.open(ComprobantePagoComponent, {
      data: {
        estado: true,
        title: 'Editar Registro',
        id: id
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.listaProformas(  {
          'user_id':this.form?.user_id,
          'fecha_inicio':this.form?.fecha_inicio,
          'fecha_fin':this.form?.fecha_fin
        });
      }
    });
  }

  applyFilters(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.paginado.filter = filterValue.trim().toLowerCase();
  }
}
