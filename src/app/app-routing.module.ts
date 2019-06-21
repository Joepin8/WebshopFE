import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from './components/home/home.component';
import {AuthComponent} from './components/auth/auth.component';

export const routes: Routes = [

  { path: '', component: HomeComponent, /*canActivate: [AuthGuard] */},
  { path: 'login', component: AuthComponent },
  // { path: 'register', component: RegisterComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
