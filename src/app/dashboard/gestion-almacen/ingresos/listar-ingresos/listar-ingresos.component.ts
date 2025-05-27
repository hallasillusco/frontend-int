import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IngresosService } from '@core/service/ingresos.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImprimirPdfComponent } from '@shared/components/imprimir-pdf/imprimir-pdf.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-ingresos',
  templateUrl: './listar-ingresos.component.html',
  styleUrl: './listar-ingresos.component.scss'
})
export class ListarIngresosComponent implements OnInit {

  nombreColumnas: string[] = [
    'Nº',
    'Usuario',
    'Nro. Factura',
    'Fecha Ingreso',
    'Proveedor',
    'Total',
    'Acciones'
  ];

  paginate!: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(
    private ingresosService:IngresosService,
    private modalService: NgbModal,

  ) {
  }

  ngOnInit(): void {
    this.listaIngresos();
  }

  listaIngresos(filter?:any) {
    this.ingresosService.getAll({
      'fecha_inicio': filter?.fecha_inicio,
      'fecha_fin': filter?.fecha_fin
    }).subscribe(data=>{
      this.paginate = new MatTableDataSource<any>(data);
      this.paginate.paginator = this.paginator;
    })
  }

  eliminar(id: any) {
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
        this.ingresosService.delete(id).subscribe( (data: any) => {
          Swal.fire(
            'Eliminado!',
            'Rgistro eliminado.',
            'success'
          )
          this.listaIngresos();
        },
        (error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Ocurrio un problema',
            text: error.error
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
    this.paginate.filter = filterValue.trim().toLowerCase();
  }

  mostrarPdf(id: any){
    this.ingresosService.pdfIngresos(id).subscribe((res: any) => {
      const file = new Blob([res], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);

      const modal = this.modalService.open(ImprimirPdfComponent, {size:'lg'});
      modal.componentInstance.estado = true;
      modal.componentInstance.title = 'Vista previa del Reporte';
      modal.componentInstance.pdfRuta = fileURL;
      modal.result.then((result: any) => {
        if (result) {
          this.listaIngresos();       
         }
      });
    });
  }

}
