import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';
import { UNIVERSAL_PROVIDERS } from '@ng-web-apis/universal';
import { NG_EVENT_PLUGINS } from '@taiga-ui/event-plugins';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(withRoutes(serverRoutes)),

    UNIVERSAL_PROVIDERS,
    NG_EVENT_PLUGINS,
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
