import { Component, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-grafico-tableau',
  standalone: true,
  templateUrl: './grafico-tableau.component.html',
  styleUrls: ['./grafico-tableau.component.scss']
})
export class GraficoTableauComponent implements AfterViewInit {

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    const container = this.el.nativeElement.querySelector('#tableauViz');

    const script = this.renderer.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';

    const viz = this.renderer.createElement('object');
    viz.className = 'tableauViz';
    viz.setAttribute('width', '100%');
    viz.setAttribute('height', '600');
    viz.innerHTML = `
      <param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' />
      <param name='embed_code_version' value='3' />
      <param name='site_root' value='' />
      <param name='name' value='Anlisisdeventasrealesvsprevistas/Hoja1' />
      <param name='tabs' value='no' />
      <param name='toolbar' value='yes' />
      <param name='static_image' value='https://public.tableau.com/static/images/An/Anlisisdeventasrealesvsprevistas/Hoja1/1.png' />
      <param name='animate_transition' value='yes' />
      <param name='display_static_image' value='yes' />
      <param name='display_spinner' value='yes' />
      <param name='display_overlay' value='yes' />
      <param name='display_count' value='yes' />
      <param name='language' value='es-ES' />
      <param name='filter' value='publish=yes' />
    `;

    this.renderer.appendChild(container, viz);
    this.renderer.appendChild(container, script);
  }
}
