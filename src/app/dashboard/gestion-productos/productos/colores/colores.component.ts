import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-colores',
  templateUrl: './colores.component.html',
  styleUrl: './colores.component.scss'
})
export class ColoresComponent {
  @Input() colores : any
  @Output()sumarControl:EventEmitter<any> = new EventEmitter<any>();
  @Output()restarControl:EventEmitter<any> = new EventEmitter<any>();

  addColores(){
    this.sumarControl.emit()
  }

  removeColores(i:any){
    this.restarControl.emit(i)
  }
  
}
