import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { provideToastr } from 'ngx-toastr';
import { IxModule } from '@siemens/ix-angular';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideClientHydration(),
    provideHttpClient(withFetch()),
    
    { provide: "baseUrl", useValue: "https://localhost:7067/api", multi: true},
    importProvidersFrom(
      IxModule.forRoot(),
      BrowserModule,
      BrowserAnimationsModule,
      RouterModule,
      AgGridModule
      ),
      provideToastr(), // Toastr providers
      provideAnimations(),
      AgGridModule
      
]
};
