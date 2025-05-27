import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-formulario-registro',
  templateUrl: './formulario-registro.component.html',
  styleUrl: './formulario-registro.component.scss'
})
export class FormularioRegistroComponent {
  @Input() checkout:any
  @Input() formSubmitted!:boolean
}
