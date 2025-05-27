import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from 'app/website-core/shared/shared.module';

@Component({
  selector: 'app-web-layout',
  standalone: true,
  imports: [RouterOutlet, SharedModule],
  templateUrl: './web-layout.component.html',
  styleUrl: './web-layout.component.scss'
})
export class WebLayoutComponent {

}
