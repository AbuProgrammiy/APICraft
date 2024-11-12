import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

// Components
import { AppComponent } from './app.component';
import { SignInUpComponent } from './pages/main-pages/sign-in-up/sign-in-up.component';
import { NewsComponent } from './pages/main-pages/news/news.component';
import { ProfileComponent } from './pages/main-pages/profile/profile.component';
import { ExampleComponent } from './example/example.component';
import { FlexibleTableComponent } from './components/primary-components/flexible-table/flexible-table.component';
import { GenerateApiComponent } from './pages/main-pages/generate-api/generate-api.component';
import { ApiTypesComponent } from './components/primary-components/api-types/api-types.component';
import { MyAPIsComponent } from './pages/main-pages/my-apis/my-apis.component';
import { NavbarComponent } from './components/primary-components/navbar/navbar.component';
import { HomeComponent } from './pages/main-pages/home/home.component';
import { TableNameInputComponent } from './components/secondary-components/table-name-input/table-name-input.component';
import { CoulmInputsComponent } from './components/secondary-components/coulm-inputs/coulm-inputs.component';
import { ShowFlexibleTableResultComponent } from './components/secondary-components/show-flexible-table-result/show-flexible-table-result.component';
import { ShowFlexibleTablesComponent } from './components/secondary-components/show-flexible-tables/show-flexible-tables.component';
import { MyApisTypesComponent } from './components/secondary-components/my-apis-types/my-apis-types.component';

// Angualr Custom Modules
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Prime-NG
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@NgModule({
  declarations: [
    AppComponent,
    SignInUpComponent,
    HomeComponent,
    NavbarComponent,
    MyAPIsComponent,
    ApiTypesComponent,
    GenerateApiComponent,
    FlexibleTableComponent,
    ExampleComponent,
    ProfileComponent,
    NewsComponent,
    TableNameInputComponent,
    CoulmInputsComponent,
    ShowFlexibleTableResultComponent,
    ShowFlexibleTablesComponent,
    MyApisTypesComponent
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
