import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ConfigStore } from '../../../config/config.store';
import { Subscription } from 'rxjs';
import { Router, RouterOutlet } from '@angular/router';
import { TuiAppearance } from '@taiga-ui/core';
import { TuiCardMedium } from '@taiga-ui/layout';

@Component({
  selector: 'app-admin-root',
  imports: [
    RouterOutlet,
    TuiAppearance,
    TuiCardMedium,
  ],
  templateUrl: './admin-root.html',
  styleUrl: './admin-root.scss',
})
export class AdminRoot implements OnInit, OnDestroy {
  private installSubscription!: Subscription;
  private configStore: ConfigStore = inject(ConfigStore);
  private router: Router = inject(Router);

  ngOnInit() {
    this.installSubscription = this.configStore.isInstalled$.subscribe(
      (isInstalled) => {
        if (isInstalled !== null && !isInstalled) {
          this.router.navigate(['/installation']);
        }
      },
    );
  }

  ngOnDestroy() {
    this.installSubscription.unsubscribe();
  }
}
