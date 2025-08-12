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
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


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
    responsive: false,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
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

  public barChartOptionsVent: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Ventas por vendedor' }
    },
    indexAxis: 'y',
    scales: {
      x: { beginAtZero: true }
    }
  };

  public barChartDataVentas: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Vendedores',
        backgroundColor: this.getBackgroundColor(),
        borderColor: this.getBorderColor(),
        borderWidth: 1
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
      this.barChartDataAgotados.labels = data.labels;
      this.barChartDataAgotados.datasets[0].data = data.data.map(Number);
      this.barChartDataAgotados = { ...this.barChartDataAgotados };
    });
  }

  obtenerDatosGraficaVentas() {
    this.reporteService.getDatosVentas().subscribe(data => {
      this.barChartDataVentas.labels = data.labels;
      this.barChartDataVentas.datasets[0].data = data.data.map(Number);
      this.barChartDataVentas = { ...this.barChartDataVentas };
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
      '#FF6384', '#36A2EB', '#FFCE56',
      '#4BC0C0', '#9966FF', '#FF9F40',
      '#66FF66', '#FF6666', '#66B2FF'
    ];
  }

  getBorderColor() {
    return [
      '#FF6384', '#36A2EB', '#FFCE56',
      '#4BC0C0', '#9966FF', '#FF9F40',
      '#66FF66', '#FF6666', '#66B2FF'
    ];
  }

  downloadTortaImage(canvas: HTMLCanvasElement) {
    const enlace = document.createElement('a');
    enlace.href = canvas.toDataURL('image/png');
    enlace.download = 'grafico_torta.png';
    enlace.click();
  }

  exportarTortaComoPDF(canvas: HTMLCanvasElement) {
    html2canvas(canvas).then(canvasExportado => {
      const imgData = canvasExportado.toDataURL('image/png');
      const pdf = new jsPDF('landscape', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 10, 10, pdfWidth - 20, pdfHeight);
      pdf.save('grafico_torta.pdf');
    });
  }

  exportarBloqueComoImagen(elemento: HTMLElement) {
    html2canvas(elemento).then(canvas => {
      const enlace = document.createElement('a');
      enlace.href = canvas.toDataURL('image/png');
      enlace.download = 'grafico_torta_completo.png';
      enlace.click();
    });
  }

  exportarBloqueComoPDF(elemento: HTMLElement) {
    html2canvas(elemento).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 10, pdfWidth, pdfHeight);
      pdf.save('grafico_torta_completo.pdf');
    });
  }
}
