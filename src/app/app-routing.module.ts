import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInUpComponent } from './pages/main-pages/sign-in-up/sign-in-up.component';
import { HomeComponent } from './pages/main-pages/home/home.component';
import { MyAPIsComponent } from './pages/main-pages/my-apis/my-apis.component';
import { GenerateApiComponent } from './pages/main-pages/generate-api/generate-api.component';
import { ExampleComponent } from './example/example.component';
import { ProfileComponent } from './pages/main-pages/profile/profile.component';
import { NewsComponent } from './pages/main-pages/news/news.component';
import { TableNameInputComponent } from './components/secondary-components/table-name-input/table-name-input.component';

const routes: Routes = [
  {path:"example",component:ExampleComponent},
  {path:"sign-in-up",component:SignInUpComponent},
  {path:"my-apis",component:MyAPIsComponent},
  {path:"generate-api",component:GenerateApiComponent},
  {path:"news",component:NewsComponent},
  {path:"profile",component:ProfileComponent},
  {path:"example",component:TableNameInputComponent},
  {path:"",component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
