import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [ // configure providers para el httpModule usando  standalone como true
    importProvidersFrom(HttpClientModule),
    ...(appConfig.providers || [])

  ]
})
  .catch((err) => console.error(err));
