import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInUpComponent } from './pages/auth-pages/sign-in-up/sign-in-up.component';
import { EmailVerificationComponent } from './pages/auth-pages/email-verification/email-verification.component';

// Angualr Custom Moduls
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Prime-NG
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { HomeComponent } from './pages/main-pages/home/home.component';
import { ForgotPasswordComponent } from './pages/auth-pages/forgot-password/forgot-password.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MyAPIsComponent } from './pages/main-pages/my-apis/my-apis.component';
import { ApiTypesComponent } from './components/api-types/api-types.component';
import { GenerateApiComponent } from './pages/main-pages/generate-api/generate-api.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInUpComponent,
    EmailVerificationComponent,
    HomeComponent,
    ForgotPasswordComponent,
    NavbarComponent,
    MyAPIsComponent,
    ApiTypesComponent,
    GenerateApiComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    ToastModule,
    ButtonModule,
    RippleModule
  ],
  providers: [
    provideClientHydration(),
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
