import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { provideToastr } from 'ngx-toastr';
import { IxModule } from '@siemens/ix-angular';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

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
      AgGridModule,
      MatDialogModule,
      MatInputModule,
      MatButtonModule,
      ReactiveFormsModule,  
    ),
      provideToastr(), // Toastr providers
      provideAnimations(),
      AgGridModule, provideAnimationsAsync()
      
]
};
