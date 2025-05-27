import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { reportesService } from '@core/service/reportes.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImprimirPdfComponent } from '@shared/components/imprimir-pdf/imprimir-pdf.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-existencias',
  templateUrl: './existencias.component.html',
  styleUrl: './existencias.component.scss'
})

export class ExistenciasComponent implements OnInit {
  nombreColumnas: string[] = [
    'Nº',
    'Código',
    'Nombre',
    'Unidad',
    'Categoría',
    'Stock',
  ];

  paginado!: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;



  constructor(
    private reportesService: reportesService,
    private modalService: NgbModal,
    ) { }

    ngOnInit(): void {
      this.Existencias();
    }

    Existencias() {
        this.reportesService.getExistencias().subscribe((data: any)=>{
          this.paginado = new MatTableDataSource<any>(data);
          this.paginado.paginator = this.paginator;
        });
      }
      Existencias_Pdf() {
      }
      imprimir(){
        this.reportesService.getExistenciasPDF().subscribe((res: any) => {
          const file = new Blob([res], { type: 'application/pdf' });
          const fileURL = URL.createObjectURL(file);

          const modal = this.modalService.open(ImprimirPdfComponent, {size:'lg'});
          modal.componentInstance.estado = true;
          modal.componentInstance.title = 'Vista previa del Reporte';
          modal.componentInstance.pdfRuta = fileURL;
          modal.result.then((result: any) => {
            if (result) {
              this.Existencias()
            }
          });
        });
      }
  applyFilters(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.paginado.filter = filterValue.trim().toLowerCase();
  }

}

