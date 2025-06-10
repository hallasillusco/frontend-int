import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { GraficoTableauComponent } from './grafico-tableau/grafico-tableau.component'; // componente standalone

@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    GraficoTableauComponent // ✅ Importas el componente standalone
  ],
  exports: [MainComponent]
})
export class DashboardModule {}
