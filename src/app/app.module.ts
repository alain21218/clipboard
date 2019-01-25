import 'reflect-metadata';
import '../polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ElectronService } from './providers/electron.service';

import { WebviewDirective } from './directives/webview.directive';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
<<<<<<< HEAD
import { MatButtonModule, MatDialogModule, MatInputModule, MatFormFieldModule, MatCardModule, MatSnackBarModule, MatToolbarModule, MatSlideToggleModule, MatCheckboxModule, MatIconModule, MatProgressSpinnerModule } from '@angular/material';
=======
import { MatButtonModule, MatDialogModule, MatInputModule, MatFormFieldModule, MatCardModule, MatSnackBarModule, MatToolbarModule, MatSlideToggleModule, MatCheckboxModule, MatIconModule } from '@angular/material';
>>>>>>> 9e10570ed6fab2448bb74fb6924b283637ca410c
import { DetailComponent } from './components/detail/detail.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { PictureComponent } from './components/picture/picture.component';
import { SortByPipe } from './pipes/sort-by.pipe';
import { ClipitemViewComponent } from './components/clipitem-view/clipitem-view.component';
<<<<<<< HEAD
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { ConfirmationService } from './components/confirmation/confirmation.service';
=======
>>>>>>> 9e10570ed6fab2448bb74fb6924b283637ca410c

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WebviewDirective,
    DetailComponent,
    TopbarComponent,
    PictureComponent,
    SortByPipe,
    ClipitemViewComponent,
<<<<<<< HEAD
    ConfirmationComponent,
=======
>>>>>>> 9e10570ed6fab2448bb74fb6924b283637ca410c
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatCheckboxModule,
<<<<<<< HEAD
    MatIconModule,
    MatProgressSpinnerModule
  ],
  entryComponents: [DetailComponent, PictureComponent, ConfirmationComponent],
  providers: [ElectronService, ConfirmationService],
=======
    MatIconModule
  ],
  entryComponents: [DetailComponent, PictureComponent],
  providers: [ElectronService],
>>>>>>> 9e10570ed6fab2448bb74fb6924b283637ca410c
  bootstrap: [AppComponent]
})
export class AppModule { }
