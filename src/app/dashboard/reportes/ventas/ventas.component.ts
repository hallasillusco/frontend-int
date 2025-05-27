import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { reportesService } from '@core/service/reportes.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImprimirPdfComponent } from '@shared/components/imprimir-pdf/imprimir-pdf.component';
import { debounceTime } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.scss'
})
export class VentasComponent implements OnInit{
  nombreColumnas: string[] = [
    'Nº',
    'Codigo',
    'Producto',
    'Unidad',
    'Categoria',
    'Cantidad',
    'Total',
  ];

form!: any;
public searching: boolean = false;
paginado!: MatTableDataSource<any>;

@ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

constructor(
  private reportesService: reportesService,
  private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.ventas();

  }

  ventas(filter?:any){
    this.form = filter;
    this.reportesService.getVentas(
     {
      ...filter
     }  
    ).subscribe((data) => {
      this.paginado = new MatTableDataSource<any>(data);
      this.paginado.paginator = this.paginator;
    })
  }

  imprimir(){
  
    this.reportesService.getVentasPDF({...this.form} )
      .subscribe((res: any) => {
      const file = new Blob([res], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);

      const modal = this.modalService.open(ImprimirPdfComponent, {size:'lg'});
      modal.componentInstance.estado = true;
      modal.componentInstance.title = 'Vista previa del Reporte';
      modal.componentInstance.pdfRuta = fileURL;
      modal.result.then((result: any) => {
        if (result) {
          this.ventas({...this.form})
        }
      });
    });
  }

  applyFilters(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.paginado.filter = filterValue.trim().toLowerCase();
  }
}


