
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { Chart } from 'chart.js';
import { reportesService } from '../../core/service/reportes.service';


interface ComparativaData {
  labels: string[];
  totales: number[];
}

@Component({
  selector: 'app-grafico-comparativa',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './grafico-comparativa.component.html',
  styleUrls: ['./grafico-comparativa.component.scss']
})
export class GraficoComparativaComponent implements OnInit {

  chart: any;

  constructor(private reportesService: reportesService) {}

  ngOnInit(): void {
    this.reportesService.getComparativaMensual().subscribe((data: ComparativaData) => {
      this.createChart(data.labels, data.totales);
    });
  }

  createChart(labels: string[], values: number[]): void {
    const canvas = document.getElementById('canvasComparativa') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (this.chart) {
      this.chart.destroy(); // evita superposición
    }

    this.chart = new Chart(ctx!, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Comparativa mensual',
            data: values,
            backgroundColor: ['#42A5F5', '#FFA726'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          title: { display: true, text: 'Comparativa mensual (ventas mes actual vs anterior)' },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
