import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { reportesService } from '@core';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { ChartData, ChartOptions } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { SharedModule } from '../../website-core/shared/shared.module';
import { GraficoTableauComponent } from '../grafico-tableau/grafico-tableau.component';
import { GraficoComparativaComponent } from '../grafico-comparativa/grafico-comparativa.component';
import { GraficoPrediccionComponent } from '../grafico-prediccion/grafico-prediccion.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    BreadcrumbComponent,
    NgChartsModule,
    CommonModule,
    GraficoPrediccionComponent,
    GraficoTableauComponent,
    GraficoComparativaComponent,
    SharedModule
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {

  datos: any;

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Top productos más vendidos' }
    }
  };

  public pieChartDataMasVendidos: ChartData<'pie'> = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
          '#9966FF', '#FF9F40', '#66FF66', '#FF6666',
          '#66B2FF', '#FFB266'
        ]
      }
    ]
  };

  public barChartDataAgotados: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        label: 'Productos agotados',
        data: [],
        backgroundColor: ['#FF9999', '#99CCFF', '#FFCC99'],
        borderWidth: 1
      }
    ]
  };

  public barChartOptionsAgotados: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Productos agotados' }
    },
    scales: {
      y: { beginAtZero: true }
    }
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: { position: 'top' }
    }
  };

  public lineChartOptionsPrediccion: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Predicción de Ventas Mensuales' }
    }
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
        label: 'Categorías',
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
        fill: false
      }
    ]
  };

  public lineChartDataPrediccion: ChartData<'line'> = {
    labels: [],
    datasets: [
      {
        label: 'Ventas reales',
        data: [],
        borderColor: 'blue',
        backgroundColor: 'transparent',
        borderWidth: 2,
        tension: 0.4
      },
      {
        label: 'Ventas previstas',
        data: [],
        borderColor: 'green',
        borderDash: [5, 5],
        borderWidth: 2,
        backgroundColor: 'transparent',
        tension: 0.4
      }
    ]
  };

  constructor(private reporteService: reportesService) {}

  ngOnInit() {
    this.r_datos();
    this.obtenerDatosGrafica();
    this.obtenerDatosGraficaAgotados();
    this.obtenerDatosGraficaVentas();
    this.obtenerDatosGraficaCategorias();
    this.obtenerDatosGraficaPrediccion();
  }

  r_datos() {
    this.reporteService.getDatos().subscribe(data => {
      this.datos = data;
    });
  }

  obtenerDatosGrafica() {
    this.reporteService.getDatosMasVendidos().subscribe((data: any) => {
      this.pieChartDataMasVendidos.labels = data.labels;
      this.pieChartDataMasVendidos.datasets[0].data = data.data.map(Number);
    });
  }

  obtenerDatosGraficaAgotados() {
    this.reporteService.getDatosAgotados().subscribe(data => {
      console.log('Agotados:', data);
      this.barChartDataAgotados.labels = data.labels;
      this.barChartDataAgotados.datasets[0].data = data.data.map(Number);
      this.barChartDataAgotados = { ...this.barChartDataAgotados };
    });
  }

  obtenerDatosGraficaVentas() {
    this.lineChartDataVentas.datasets[0].backgroundColor = this.getBackgroundColor();
    this.lineChartDataVentas.datasets[0].borderColor = this.getBorderColor();
    this.reporteService.getDatosVentas().subscribe(data => {
      this.lineChartDataVentas.labels = data.labels;
      this.lineChartDataVentas.datasets[0].data = data.data.map(Number);
    });
  }

  obtenerDatosGraficaCategorias() {
    this.lineChartDataCategorias.datasets[0].backgroundColor = this.getBackgroundColor();
    this.lineChartDataCategorias.datasets[0].borderColor = this.getBorderColor();
    this.reporteService.getDatosCategorias().subscribe(data => {
      this.lineChartDataCategorias.labels = data.labels;
      this.lineChartDataCategorias.datasets[0].data = data.data.map(Number);
    });
  }

  obtenerDatosGraficaPrediccion() {
    this.reporteService.getDatosPrediccion().subscribe(
      data => {
        this.lineChartDataPrediccion.labels = data.labels;
        this.lineChartDataPrediccion.datasets[0].data = data.reales.map((val: number | null) => val !== null ? Number(val) : NaN);
        this.lineChartDataPrediccion.datasets[1].data = data.predichos.map((val: number | null) => val !== null ? Number(val) : NaN);
      },
      error => {
        console.error('Error al obtener datos de predicción', error);
      }
    );
  }

  getBackgroundColor() {
    return [
      'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)',
      'rgba(0, 255, 127, 0.2)', 'rgba(255, 69, 0, 0.2)', 'rgba(50, 205, 50, 0.2)'
    ];
  }

  getBorderColor() {
    return [
      'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)',
      'rgba(0, 255, 127, 1)', 'rgba(255, 69, 0, 1)', 'rgba(50, 205, 50, 1)'
    ];
  }
}

