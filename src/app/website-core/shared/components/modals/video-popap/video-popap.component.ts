import { Component } from '@angular/core';
import { UtilsService } from 'app/website-core/shared/services/utils.service';

@Component({
  selector: 'app-video-popap',
  templateUrl: './video-popap.component.html',
  styleUrls: ['./video-popap.component.scss']
})
export class VideoPopapComponent {

  constructor(public utilsService: UtilsService){}
}
