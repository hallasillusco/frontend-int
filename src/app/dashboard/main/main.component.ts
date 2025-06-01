import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { reportesService } from '@core';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { ChartData, ChartOptions } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { Observable } from 'rxjs';
import { Chart } from 'chart.js';

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

  // Opciones generales (sin título)
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: { position: 'top' }
    }
  };

  // Opciones exclusivas para predicción (con título)
  public lineChartOptionsPrediccion: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Predicción de Ventas Mensuales' }
    }
  };

  public lineChartData: ChartData<'line'> = {
    labels: [],
    datasets: [{
      data: [],
      label: 'Productos',
      backgroundColor: [],
      borderColor: [],
      borderWidth: 1,
      fill: false
    }]
  };

  public lineChartDataAgotados: ChartData<'line'> = {
    labels: [],
    datasets: [{
      data: [],
      label: 'Productos',
      backgroundColor: [],
      borderColor: [],
      borderWidth: 1,
      fill: false
    }]
  };

  public lineChartDataVentas: ChartData<'line'> = {
    labels: [],
    datasets: [{
      data: [],
      label: 'Vendedores',
      backgroundColor: [],
      borderColor: [],
      borderWidth: 1,
      fill: false
    }]
  };

  public lineChartDataCategorias: ChartData<'line'> = {
    labels: [],
    datasets: [{
      data: [],
      label: 'Categorías',
      backgroundColor: [],
      borderColor: [],
      borderWidth: 1,
      fill: false
    }]
  };

  public lineChartDataPrediccion: ChartData<'line'> = {
    labels: [],
    datasets: [
      {
        label: 'Ventas reales',
        data: [],
        borderColor: '#4bc0c0',
        fill: false,
        tension: 0.4
      },
      {
        label: 'Ventas previstas',
        data: [],
        borderColor: '#ff6384',
        borderDash: [5, 5],
        fill: false,
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
    this.lineChartData.datasets[0].backgroundColor = this.getBackgroundColor();
    this.lineChartData.datasets[0].borderColor = this.getBorderColor();
    this.reporteService.getDatosMasvendidos().subscribe(data => {
      this.lineChartData.labels = data.labels;
      this.lineChartData.datasets[0].data = data.data.map(Number);
    });
  }

  obtenerDatosGraficaAgotados() {
    this.lineChartDataAgotados.datasets[0].backgroundColor = this.getBackgroundColor();
    this.lineChartDataAgotados.datasets[0].borderColor = this.getBorderColor();
    this.reporteService.getDatosAgotados().subscribe(data => {
      this.lineChartDataAgotados.labels = data.labels;
      this.lineChartDataAgotados.datasets[0].data = data.data.map(Number);
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
      console.log('Predicción:', data); // <- este log debería mostrar el JSON correctamente
      this.lineChartDataPrediccion.labels = data.labels;
      this.lineChartDataPrediccion.datasets[0].data = data.reales.map(Number);
      this.lineChartDataPrediccion.datasets[1].data = data.predichos.map(Number);
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
