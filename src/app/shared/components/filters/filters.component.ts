import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '@core/service/user.service';
import { WebMaterialModule } from 'app/webmaterial.module';
import * as moment from 'moment';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    WebMaterialModule,
  ],
  providers:[
    DatePipe
  ],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss'
})
export class FiltersComponent {

  @Input() type!: string[];
  @Output()dataLista:EventEmitter<any> = new EventEmitter<any>();
  form!: FormGroup;
  usuarios: any;

  constructor(
    private fb:  FormBuilder,
    private datePipe: DatePipe,
    private usuariosService: UserService
  ) {
    this.listaUsuarios();
    this.controles();
   
    this.form.valueChanges.subscribe(data=>{
      // const fecha_inicio = new Date(data.fecha_inicio._d);
      // const fecha_inicio_ = moment(fecha_inicio).format('YYYY-MM-DD');
      // const fecha_fin = new Date(data.fecha_fin._d);
      // const fecha_fin_ = moment(fecha_fin).format('YYYY-MM-DD');

      this.lista(data)

    })

    console.log(this.type);

  }


  controles() {
    this.form = this.fb.group({
      user_id:[''],
      fecha_inicio:[this.datePipe.transform(Date.now(),'yyyy-MM-dd')],
      fecha_fin:[this.datePipe.transform(Date.now(),'yyyy-MM-dd')]
    })
  }


  lista(data:any){
    this.dataLista.emit(data)

  }

  listaUsuarios() {
    this.usuariosService.getAll().subscribe((data: any) => {
      this.usuarios = data;
    })
  }

}
