import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { UserComponent } from './components/user/user.component';
import { HomeComponent } from './components/home/home.component';
import {FormsModule} from '@angular/forms';
import {AuthComponent} from './components/auth/auth.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import { ProductComponent } from './components/product/product.component';
import { ProductOmschrijvingComponent } from './components/product-omschrijving/product-omschrijving.component';
import {KonamiModule} from 'ngx-konami';
import { CartComponent } from './components/cart/cart.component';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    HomeComponent,
    AuthComponent,
    ProductComponent,
    ProductOmschrijvingComponent,
    CartComponent
  ],
  imports: [
    MaterialModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    KonamiModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
