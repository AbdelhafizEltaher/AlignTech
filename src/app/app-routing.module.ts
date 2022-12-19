import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutusComponent } from './Components/aboutus/aboutus.component';
import { CartComponent } from './Components/cart/cart.component';
import { CategoriesComponent } from './Components/categories/categories.component';
import { ContactusComponent } from './Components/contactus/contactus.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { MovieDetailsComponent } from './Components/movie-details/movie-details.component';
import { MoviesComponent } from './Components/movies/movies.component';
import { PagesComponent } from './Components/pages/pages.component';
import { RegisterComponent } from './Components/register/register.component';
import { AuthGuard } from './Guard/auth.guard';

const routes: Routes = [

  {path:"",component:LoginComponent},
  {path:"userregister",component:RegisterComponent},
  {path:"userlogin",component:LoginComponent},
  {path:"pages",component:PagesComponent,children:[
    {path:"home",component:HomeComponent , canActivate:[AuthGuard]},
    {path:"contactus",component:ContactusComponent, canActivate:[AuthGuard]},
    {path:"aboutus",component:AboutusComponent , canActivate:[AuthGuard]},
    {path:"movies",component:MoviesComponent , canActivate:[AuthGuard]},
    {path:"moviesDetails/:id",component:MovieDetailsComponent , canActivate:[AuthGuard]},
    {path:"Category",component:CategoriesComponent , canActivate:[AuthGuard]},
    {path:"Cart",component:CartComponent , canActivate:[AuthGuard]},



  ]},
  {path:"**",component:LoginComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
