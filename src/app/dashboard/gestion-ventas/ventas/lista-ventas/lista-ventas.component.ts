import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { VentasService } from '@core/service/ventas.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '@core/service/user.service';
import { debounceTime } from 'rxjs';
import { ImprimirPdfComponent } from '@shared/components/imprimir-pdf/imprimir-pdf.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-lista-ventas',
  standalone: false,
  templateUrl: './lista-ventas.component.html',
  styleUrl: './lista-ventas.component.scss'
})
export class ListaVentasComponent  implements OnInit {

  nombreColumnas: string[] = [
    'Nº',
    'Usuario',
    'Cliente',
    'Fecha-Registro',
    'Total',
    'Acciones'
  ];

  form!: any;
  ventas!: any;
  usuarios!: any;
  public searching: boolean = false;
  paginado!: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(
    private ventasService: VentasService,
    private modalService: NgbModal
    ) { }


    ngOnInit(): void {
      this.listaVentas();
    }

    listaVentas(filter?:any) {
        this.form = filter;
        this.ventasService.getAll({
          'user_id': filter?.user_id,
          'fecha_inicio': filter?.fecha_inicio,
          'fecha_fin': filter?.fecha_fin
        }).subscribe((data: any)=>{
          this.paginado = new MatTableDataSource<any>(data);
          this.paginado.paginator = this.paginator;
        });
      }
    applyFilters(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.paginado.filter = filterValue.trim().toLowerCase();
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
        this.ventasService.delete(id).subscribe( (data: any) => {
          console.log(data);
          this.listaVentas(  {
              'user_id':this.form?.user_id,
              'fecha_inicio':this.form?.fecha_inicio,
              'fecha_fin':this.form?.fecha_fin
            });
          Swal.fire(
            'Eliminado!',
            'Registro eliminado.',
            'success'
          )
          this.listaVentas(  {
              'user_id':this.form?.user_id,
              'fecha_inicio':this.form?.fecha_inicio,
              'fecha_fin':this.form?.fecha_fin
            });
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
  mostrarPdf(id: any){
    this.ventasService.getVentasPDF(id).subscribe((res: any) => {
      const file = new Blob([res], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);

      const modal = this.modalService.open(ImprimirPdfComponent, {size:'lg'});
      modal.componentInstance.estado = true;
      modal.componentInstance.title = 'Vista previa del Reporte';
      modal.componentInstance.pdfRuta = fileURL;
      modal.result.then((result: any) => {
        if (result) {
          this.listaVentas(
            {
              'user_id':this.form?.user_id,
              'fecha_inicio':this.form?.fecha_inicio,
              'fecha_fin':this.form?.fecha_fin
            }
          );
        }
      });
    });
  }
}
