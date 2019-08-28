import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserComponent} from './components/user/user.component';
import {HomeComponent} from './components/home/home.component';
import {AuthComponent} from './components/auth/auth.component';
import {AuthGuardService} from './services/auth-guard.service';
import {ProductOmschrijvingComponent} from './components/product-omschrijving/product-omschrijving.component';
import {CartComponent} from './components/cart/cart.component';

export const routes: Routes = [

  { path: 'shop', component: HomeComponent},
  {path: 'products/:id', component: ProductOmschrijvingComponent},
  { path: 'login', component: AuthComponent} ,
  {path: 'shopping-cart', component: CartComponent},
  {path: 'user', component: UserComponent, canActivate: [AuthGuardService]},




  // { path: 'register', component: RegisterComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: 'shop' }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
