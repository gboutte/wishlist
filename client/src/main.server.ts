import { bootstrapApplication } from '@angular/platform-browser';
import { config } from './app/app.config.server';
import { AppRoot } from './app/app-root/app-root';

const bootstrap = () => bootstrapApplication(AppRoot, config);

export default bootstrap;
