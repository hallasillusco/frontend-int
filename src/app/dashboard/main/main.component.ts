import { CommonModule } from '@angular/common';
import { Component, ViewChild, OnInit } from '@angular/core';
import { reportesService } from '@core';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { ChartData, ChartOptions } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
      BreadcrumbComponent,
      NgChartsModule,
      CommonModule
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {

  datos: any;
  
  public lineChartData: ChartData<'line'> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Productos',
        backgroundColor: [],
        borderColor: [],
        // borderColor: '#42A5F5',
        borderWidth: 1,
        fill: false
      }
    ]
  };
  
  public lineChartDataAgotados: ChartData<'line'> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Productos',
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
        fill: false
      }
    ]
  };
  
  public lineChartDataVentas: ChartData<'line'> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Vendedores',
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
        fill: false
      }
    ]
  };
  
  public lineChartDataCategorias: ChartData<'line'> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Categorias',
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
        fill: false
      }
    ]
  };
  
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true
  };

  constructor( private reporteService: reportesService  ) {    
  }

  ngOnInit() {
    this.r_datos();
    this.obtenerDatosGrafica();
    this.obtenerDatosGraficaAgotados();
    this.obtenerDatosGraficaVentas();
    this.obtenerDatosGraficaCategorias();
  }

  r_datos() {
    this.reporteService.getDatos().subscribe(
      data=>{
        this.datos = data;
        console.log(this.datos);        
      }
    )
  }

  obtenerDatosGrafica() {
    // this.lineChartData.labels = ['Producto 1', 'Producto 2', 'Producto 3', 'Producto 4', 'Producto 5', 'Producto 6', 'Producto 7'];
    // const datosnumber = [65, 59, 80, 81, 56, 55, 40];
    // // this.lineChartData.datasets[0].data = datosnumber.map(Number);
    // this.lineChartData.datasets[0].data = datosnumber;
    this.lineChartData.datasets[0].backgroundColor = this.getBackgroundColor();
    this.lineChartData.datasets[0].borderColor = this.getBorderColor();

    this.reporteService.getDatosMasvendidos().subscribe(
      data => {
        this.lineChartData.labels = data.labels;
        this.lineChartData.datasets[0].data = data.data.map(Number);
      },
      error => {
        console.error('Error al obtener datos grafica', error);
      }
    );
  }

  obtenerDatosGraficaAgotados() {
    this.lineChartDataAgotados.datasets[0].backgroundColor = this.getBackgroundColor();
    this.lineChartDataAgotados.datasets[0].borderColor = this.getBorderColor();

    this.reporteService.getDatosAgotados().subscribe(
      data => {
        this.lineChartDataAgotados.labels = data.labels;
        this.lineChartDataAgotados.datasets[0].data = data.data.map(Number);
      },
      error => {
        console.error('Error al obtener datos grafica', error);
      }
    );
  }

  obtenerDatosGraficaVentas() {
    this.lineChartDataVentas.datasets[0].backgroundColor = this.getBackgroundColor();
    this.lineChartDataVentas.datasets[0].borderColor = this.getBorderColor();

    this.reporteService.getDatosVentas().subscribe(
      data => {
        this.lineChartDataVentas.labels = data.labels;
        this.lineChartDataVentas.datasets[0].data = data.data.map(Number);
      },
      error => {
        console.error('Error al obtener datos grafica', error);
      }
    );
  }

  obtenerDatosGraficaCategorias() {
    this.lineChartDataCategorias.datasets[0].backgroundColor = this.getBackgroundColor();
    this.lineChartDataCategorias.datasets[0].borderColor = this.getBorderColor();

    this.reporteService.getDatosCategorias().subscribe(
      data => {
        this.lineChartDataCategorias.labels = data.labels;
        this.lineChartDataCategorias.datasets[0].data = data.data.map(Number);
      },
      error => {
        console.error('Error al obtener datos grafica', error);
      }
    );
  }

  getBackgroundColor() {
    return [
      'rgba(255, 99, 132, 0.2)', // Color 1
      'rgba(54, 162, 235, 0.2)', // Color 2
      'rgba(255, 206, 86, 0.2)', // Color 3
      'rgba(75, 192, 192, 0.2)', // Color 4
      'rgba(153, 102, 255, 0.2)', // Color 5
      'rgba(255, 159, 64, 0.2)', // Color 6
      'rgba(255, 99, 132, 0.2)', // Color 7
      'rgba(0, 255, 127, 0.2)',  // Color 8
      'rgba(255, 69, 0, 0.2)',   // Color 9
      'rgba(50, 205, 50, 0.2)'   // Color 10
    ];
  }
  getBorderColor() {
    return [
      'rgba(255, 99, 132, 1)', // Color 1
      'rgba(54, 162, 235, 1)', // Color 2
      'rgba(255, 206, 86, 1)', // Color 3
      'rgba(75, 192, 192, 1)', // Color 4
      'rgba(153, 102, 255, 1)', // Color 5
      'rgba(255, 159, 64, 1)', // Color 6
      'rgba(255, 99, 132, 1)', // Color 7
      'rgba(0, 255, 127, 1)',  // Color 8
      'rgba(255, 69, 0, 1)',   // Color 9
      'rgba(50, 205, 50, 1)'   // Color 10
    ];
  }
}
