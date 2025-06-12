import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { reportesService } from '../../core/service/reportes.service';

@Component({
  selector: 'app-grafico-prediccion',
  standalone: true,  // 👈 Esta línea es clave
 
  templateUrl: './grafico-prediccion.component.html',
  styleUrls: ['./grafico-prediccion.component.scss']
})

export class GraficoPrediccionComponent implements OnInit {

  constructor(private reportesService: reportesService) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.reportesService.getDatosPrediccion().subscribe((data: any) => {
      console.log('Datos recibidos para predicción:', data);
      this.crearGrafico(data.labels, data.reales, data.previstas);
    });
  }

  crearGrafico(labels: string[], reales: number[], previstas: number[]): void {
    const canvas: any = document.getElementById('canvasPrediccion');
    const ctx = canvas.getContext('2d');

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Ventas Reales',
            data: reales,
            borderColor: 'blue',
            backgroundColor: 'transparent',
            tension: 0.3
          },
          {
            label: 'Ventas Previstas',
            data: previstas,
            borderColor: 'green',
            backgroundColor: 'transparent',
            tension: 0.3
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Predicción de ventas mensuales'
          }
        }
      }
    });
  }
}

