import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiButton, TuiLabel, TuiLoader, TuiTextfieldComponent, TuiTextfieldDirective } from '@taiga-ui/core';
import { TuiCurrencyPipe } from '@taiga-ui/addon-commerce';
import { TuiInputNumberDirective, TuiSwitch, TuiTextarea, TuiTextareaLimit } from '@taiga-ui/kit';
import { ConfigService } from '../../../config/config.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-config-page',
  imports: [
    ReactiveFormsModule,
    TuiButton,
    TuiCurrencyPipe,
    TuiInputNumberDirective,
    TuiLabel,
    TuiLoader,
    TuiSwitch,
    TuiTextfieldComponent,
    TuiTextfieldDirective,
    TuiTextarea,
    TuiTextareaLimit,
    RouterLink,
  ],
  templateUrl: './config-page.html',
  styleUrl: './config-page.scss'
})
export class ConfigPage implements OnInit {
  configForm : FormGroup = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string>('',  [Validators.required]),
  })

  loading: boolean = true;

  configService: ConfigService = inject(ConfigService);
  private router:Router = inject(Router);

  onSubmit(){
    this.saveConfig();
  }

  ngOnInit() {
    this.loadconfig();

  }

  loadconfig() {
    this.configService.getConfigProject().subscribe({
      next: (config) => {
        this.configForm.patchValue({
          name: config.name,
          description: config.description
        });
        this.loading = false;
      },
      error: (error) => {
      }
    })
  }

  get name() : FormControl<string> {
    return this.configForm.get('name') as FormControl<string>;
  }

  get description() : FormControl<string> {
    return this.configForm.get('description') as FormControl<string>;
  }

  saveConfig() {
    this.configService.saveConfigProject(this.name.value, this.description.value).subscribe({
      next: () => {
        this.router.navigate(['/admin']);
      },
      error: (error) => {
        console.error('Error saving configuration:', error);
      }
    });
  }
}
