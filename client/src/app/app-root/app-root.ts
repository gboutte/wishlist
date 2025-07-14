import { TuiRoot } from "@taiga-ui/core";
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConfigService } from '../config/config.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
      TuiRoot
],
  templateUrl: './app-root.html',
  styleUrl: './app-root.scss'
})
export class AppRoot {
  private configService: ConfigService = inject(ConfigService);


  constructor() {
    this.configService.refreshConfigStore();
  }

}
