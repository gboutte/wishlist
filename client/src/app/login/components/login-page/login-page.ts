import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConfigStore } from '../../../config/config.store';
import { Router } from '@angular/router';
import { TuiAppearance, TuiButton, TuiIcon, TuiTextfield } from '@taiga-ui/core';
import { TuiPassword, TuiTooltip } from '@taiga-ui/kit';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiCardMedium } from '@taiga-ui/layout';
import { AuthService } from '../../../auth/services/auth.service';
import { SessionService } from '../../../auth/services/session.service';

@Component({
  selector: 'app-login-page',
  imports: [
    TuiTextfield,
    TuiIcon,
    FormsModule,
    TuiButton,
    ReactiveFormsModule,
    TuiPassword,
    TuiAppearance,
    TuiCardMedium,
  ],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss'
})
export class LoginPage implements OnInit, OnDestroy {
  private installSubscription!: Subscription;
  private configStore: ConfigStore = inject(ConfigStore);
  private router: Router = inject(Router);
  private authService: AuthService = inject(AuthService);
  private sessionService: SessionService = inject(SessionService);


  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  })

  ngOnInit() {
    this.installSubscription = this.configStore.isInstalled$.subscribe(
      (isInstalled) => {
        if (isInstalled !== null && !isInstalled) {
          this.router.navigate(['/installation']);
        }
      },
    );

    if (
      this.sessionService.isLoggedIn() &&
      this.sessionService.isSessionValid()
    ) {
      this.router.navigate(['/admin']);
    }
  }

  ngOnDestroy() {
    this.installSubscription.unsubscribe();
  }

  login() {
    if (this.loginForm.valid && !this.loginForm.disabled) {
      this.loginForm.disable();
      this.authService
        .login(this.username.value, this.password.value)
        .subscribe({
          next: (response) => {
            this.sessionService.setTokens(response.access_token);
            this.router.navigate(['/admin']);
          },
          error: () => {

            console.error('Invalid credentials');
            this.loginForm.enable();
          },
        });
    }
  }

  get username(): FormControl {
    return this.loginForm.get('username') as FormControl;
  }

  get password(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }
}
