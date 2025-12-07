import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConfigStore } from '../../../config/config.store';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  TuiAppearance,
  TuiButton,
  TuiIcon,
  TuiLabel,
  TuiTextfieldComponent,
  TuiTextfieldDirective,
} from '@taiga-ui/core';
import { TuiPassword, TuiTextarea, TuiTextareaLimit } from '@taiga-ui/kit';
import { TuiCardMedium } from '@taiga-ui/layout';
import { AuthService } from '../../../auth/services/auth.service';
import { ConfigService } from '../../../config/config.service';

@Component({
  selector: 'app-install-page',
  imports: [
    ReactiveFormsModule,
    TuiAppearance,
    TuiButton,
    TuiIcon,
    TuiLabel,
    TuiPassword,
    TuiTextfieldComponent,
    TuiTextfieldDirective,
    TuiCardMedium,
    TuiTextarea,
    TuiTextareaLimit,
  ],
  templateUrl: './install-page.html',
  styleUrl: './install-page.scss',
  providers: [
    AuthService
  ],
})
export class InstallPage implements OnInit,OnDestroy{
  private installSubscription!: Subscription;
  private configStore: ConfigStore = inject(ConfigStore);
  private router: Router = inject(Router);
  private authService: AuthService = inject(AuthService);
  private configService: ConfigService = inject(ConfigService);



  installLogin = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  })


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

  install() {
    if (this.installLogin.valid) {

      this.authService.install(
        this.username.value,
        this.password.value,
        this.name.value,
        this.description.value

      ).subscribe({
        next: () => {

          this.configService.refreshConfigStore().subscribe({
            next: () => {
              this.router.navigate(['/login']);
            }
          })
        },
        error: (err) => {
          console.error('Installation failed:', err);
        }
      });
    } else {
      console.warn('Form is invalid');
    }
  }

  get username() :FormControl{
    return this.installLogin.get('username') as FormControl;
  }

  get password() :FormControl {
    return this.installLogin.get('password') as FormControl;
  }

  get name() :FormControl {
    return this.installLogin.get('name') as FormControl;
  }

  get description() :FormControl {
    return this.installLogin.get('description') as FormControl;
  }

}
