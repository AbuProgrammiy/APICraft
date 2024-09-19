import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInUpComponent } from './pages/auth-pages/sign-in-up/sign-in-up.component';
import { EmailVerificationComponent } from './pages/auth-pages/email-verification/email-verification.component';
import { HomeComponent } from './pages/main-pages/home/home.component';
import { ForgotPasswordComponent } from './pages/auth-pages/forgot-password/forgot-password.component';
import { MyAPIsComponent } from './pages/main-pages/my-apis/my-apis.component';
import { GenerateApiComponent } from './pages/main-pages/generate-api/generate-api.component';
import { ExampleComponent } from './example/example.component';
import { ProfileComponent } from './pages/main-pages/profile/profile.component';
import { NewsComponent } from './pages/main-pages/news/news.component';

const routes: Routes = [
  {path:"example",component:ExampleComponent},
  {path:"sign-in-up",component:SignInUpComponent},
  {path:"email-verifications",component:EmailVerificationComponent},
  {path:"forgot-password",component:ForgotPasswordComponent},
  {path:"my-apis",component:MyAPIsComponent},
  {path:"generate-api",component:GenerateApiComponent},
  {path:"news",component:NewsComponent
},
  {path:"profile",component:ProfileComponent},
  {path:"",component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
