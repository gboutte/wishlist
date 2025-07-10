import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConfigStore } from '../../../config/config.store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-install-page',
  imports: [],
  templateUrl: './install-page.html',
  styleUrl: './install-page.scss'
})
export class InstallPage implements OnInit,OnDestroy{
  private installSubscription!: Subscription;
  private configStore: ConfigStore = inject(ConfigStore);
  private router: Router = inject(Router);

  ngOnInit() {
    this.installSubscription = this.configStore.isInstalled$.subscribe(
      (isInstalled) => {
        if (isInstalled) {
          this.router.navigate(['/login']);
        }
      },
    );
  }

  ngOnDestroy() {
    this.installSubscription.unsubscribe();
  }

}
