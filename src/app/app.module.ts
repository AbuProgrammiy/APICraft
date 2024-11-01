import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInUpComponent } from './pages/main-pages/sign-in-up/sign-in-up.component';

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
import { NavbarComponent } from './components/primary-components/navbar/navbar.component';
import { MyAPIsComponent } from './pages/main-pages/my-apis/my-apis.component';
import { ApiTypesComponent } from './components/primary-components/api-types/api-types.component';
import { GenerateApiComponent } from './pages/main-pages/generate-api/generate-api.component';
import { TableNameInputComponent } from './secondary-components/table-name-input/table-name-input.component';
import { CoulmInputsComponent } from './secondary-components/coulm-inputs/coulm-inputs.component';
import { FlexibleTableComponent } from './components/primary-components/flexible-table/flexible-table.component';
import { ExampleComponent } from './example/example.component';
import { ShowFlexibleTableResultComponent } from './secondary-components/show-flexible-table-result/show-flexible-table-result.component';
import { MyApisTypesComponent } from './secondary-components/my-apis-types/my-apis-types.component';
import { ShowFlexibleTablesComponent } from './secondary-components/show-flexible-tables/show-flexible-tables.component';
import { ProfileComponent } from './pages/main-pages/profile/profile.component';
import { NewsComponent } from './pages/main-pages/news/news.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInUpComponent,
    HomeComponent,
    NavbarComponent,
    MyAPIsComponent,
    ApiTypesComponent,
    GenerateApiComponent,
    TableNameInputComponent,
    CoulmInputsComponent,
    FlexibleTableComponent,
    ExampleComponent,
    ShowFlexibleTableResultComponent,
    MyApisTypesComponent,
    ShowFlexibleTablesComponent,
    ProfileComponent,
    NewsComponent,
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
