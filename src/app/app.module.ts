import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { SearchComponent } from './components/search/search.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from './pipes/filter.pipe';
import { MainHeaderComponent } from './components/main-header/main-header.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { HomeComponent } from './components/home/home.component';
import { OrdersComponent } from './components/orders/orders.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditContactComponent } from './components/edit-contact/edit-contact.component';
import { ShowContactComponent } from './components/show-contact/show-contact.component';
import { AddContactComponent } from './components/add-contact/add-contact.component';
import { IsEmployeePipe } from './pipes/is-employee.pipe';
import { ProfileComponent } from './components/profile/profile.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { AddProjectComponent } from './components/add-project/add-project.component';
import { EditProjectComponent } from './components/edit-project/edit-project.component';
import { PnfComponent } from './components/pnf/pnf.component';
import { ProjectFilterPipe } from './pipes/project-filter.pipe';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ChartModule, LineSeriesService, CategoryService, LegendService, DataLabelService, TooltipService, AccumulationChartModule, PieSeriesService, AccumulationDataLabelService, AccumulationLegendService, AccumulationTooltipService, ColumnSeriesService } from '@syncfusion/ej2-angular-charts';


@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    NavbarComponent,
    FilterPipe,
    MainHeaderComponent,
    LoginComponent,
    RegisterComponent,
    ContactsComponent,
    HomeComponent,
    OrdersComponent,
    EditContactComponent,
    ShowContactComponent,
    AddContactComponent,
    IsEmployeePipe,
    ProfileComponent,
    ProjectsComponent,
    AddProjectComponent,
    EditProjectComponent,
    PnfComponent,
    ProjectFilterPipe,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    NgbModule,
    ChartModule,
    AccumulationChartModule
  ],
  providers: [LineSeriesService, CategoryService, LegendService, DataLabelService, TooltipService, PieSeriesService, AccumulationDataLabelService, AccumulationLegendService, AccumulationTooltipService, ColumnSeriesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
