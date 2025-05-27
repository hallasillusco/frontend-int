import { Component } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { ConfiguracionService } from '../../core/service/configuracion.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WebMaterialModule } from 'app/webmaterial.module';
@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    standalone: true,
    imports: [
        BreadcrumbComponent,
        WebMaterialModule,
        ReactiveFormsModule,
        FormsModule
    ],
})
export class ProfileComponent {

  form!: FormGroup;

  constructor(
    private configService:ConfiguracionService,
    private fb: FormBuilder,
  ) {

    this.control();

    this.configService.getAll().subscribe(data=>{
      this.form.patchValue({
        razon_social: data.razon_social,
        direccion: data.direccion,
        telefono: data.telefono,
        pago_bancario: data.pago_bancario==1?true:false,
        pago_qr: data.pago_qr==1?true:false
      })
      
    })
  }

  control() {
    this.form = this.fb.group({
      razon_social:[''],
      direccion:[''],
      telefono:[''],
      pago_bancario:[''],
      pago_qr:[''],
    })
  }
}
