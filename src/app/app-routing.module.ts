import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInUpComponent } from './pages/auth-pages/sign-in-up/sign-in-up.component';
import { EmailVerificationComponent } from './pages/auth-pages/email-verification/email-verification.component';
import { HomeComponent } from './pages/main-pages/home/home.component';
import { ForgotPasswordComponent } from './pages/auth-pages/forgot-password/forgot-password.component';
import { MyAPIsComponent } from './pages/main-pages/my-apis/my-apis.component';

const routes: Routes = [
  {path:"sign-in-up",component:SignInUpComponent},
  {path:"email-verifications",component:EmailVerificationComponent},
  {path:"forgot-password",component:ForgotPasswordComponent},
  {path:"my-apis",component:MyAPIsComponent},
  {path:"",component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
