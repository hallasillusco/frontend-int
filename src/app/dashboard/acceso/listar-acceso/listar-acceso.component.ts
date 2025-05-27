import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AccesoService } from '@core/service/acceso.service';

@Component({
  selector: 'app-listar-acceso',
  // standalone: true,
  // imports: [],
  templateUrl: './listar-acceso.component.html',
  styleUrl: './listar-acceso.component.scss'
})
export class ListarAccesoComponent {
  form!: any;
  nombreColumnas: string[] = [
    'Nº',
    'Nombre',
    'Entrada',
    // 'Acciones'
  ];
  paginado!: MatTableDataSource<any>;

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  
  constructor(
    private principalService: AccesoService
  ){ }

  
  ngOnInit(): void {
    this.listar();
  }
  listar(filter?:any){
      this.form = filter;
      this.principalService.getAll({
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

}
