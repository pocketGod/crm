import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsComponent } from './components/contacts/contacts.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { RegisterComponent } from './components/register/register.component';
import { SearchComponent } from './components/search/search.component';
import { AuthGuard } from './guards/auth.guard';
import { PreventDoubleSignInGuard } from './guards/prevent-double-sign-in.guard';

const routes: Routes = [
  {path:'', pathMatch:'full', redirectTo:'home/login'},
  {path:'explore', component:NavbarComponent, canActivate:[AuthGuard], children:[
    {path:'', pathMatch:'full', redirectTo:'explore/table'},
    {path:'contacts', component:ContactsComponent},
    {path:'table', component:SearchComponent},
    {path:'orders', component:OrdersComponent},
    {path:'profile', component:ProfileComponent},
    {path:'projects', component:ProjectsComponent}
  ]},
  {path:'home', component:HomeComponent, canActivate:[PreventDoubleSignInGuard], children:[
    {path:'login', component:LoginComponent},
    {path:'register', component:RegisterComponent}
  ]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
