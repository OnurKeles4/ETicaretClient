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
import { IxModule, IxSpinner } from '@siemens/ix-angular';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { NgxFileDropComponent, NgxFileDropModule } from 'ngx-file-drop'; 
import { DataService } from './services/ui/animation/animation-service';

import { NgxSpinnerModule } from 'ngx-spinner';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideClientHydration(),
    provideHttpClient(withFetch()),
    DataService,
    { provide: "baseUrl", useValue: "https://localhost:7067/api", multi: true},
    importProvidersFrom(
      IxModule.forRoot(),
      BrowserModule,
      BrowserAnimationsModule,
      RouterModule,
      AgGridModule,
      MatDialogModule,
      MatInputModule,
      //MatButtonModule,
      ReactiveFormsModule,
      NgxFileDropModule,
      NgxFileDropComponent,
      NgxSpinnerModule,
    ),
      provideToastr(), // Toastr providers
      provideAnimations(),
      IxSpinner,
      AgGridModule, provideAnimationsAsync(),
      
      
]
};
