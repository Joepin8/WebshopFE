import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {AuthorizationService} from './authorization.service';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Product} from '../models/product.model';
import {Cart} from '../models/cart.model';
import {ProductService} from './product.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CartService {


  storedCartItems: Cart[] = [];
  cartItems: Product[] = [];


  constructor(private api: ApiService,
              private authService: AuthorizationService,
              private productService: ProductService,
              private router: Router) {

  }

  public getStoredCarts() {
    if (this.authService.hasAuthorization()) {
      this.api.get<Cart[]>('cart/' + this.authService.getAuthenticator().user_id, this.authService.authorized$)
        .subscribe(items => {
          this.storedCartItems = items;
        });
    }
  }
  public getCarts(): Cart[] {
    return this.storedCartItems;
  }

  public addToCarts(product: Product) {
    if (!this.alreadyInCart(product.productId)) {
        this.storedCartItems.push(new Cart(null, null,
          product.productId, 1));
        if (this.authService.hasAuthorization()) {
          this.save(new Cart(null, this.authService.getAuthenticator().user_id,
            product.productId, 1));
        }
    } else {
      alert('Dit product zit al in de winkelwagen');
    }
  }

  public deleteFromCarts(productId: number) {
    if (this.authService.hasAuthorization()) {
      this.delete(productId, this.authService.getAuthenticator().user_id);
    }
    this.storedCartItems.forEach((cartItem, index) => {
      if (cartItem.productId === productId) {
        this.storedCartItems.splice(index, 1);
      }
    });
  }

  public updateCarts(productId: number, aantal: number) {
    if (this.authService.hasAuthorization()) {
      this.update(new Cart(0,this.authService.getAuthenticator().user_id, productId, aantal), this.authService.getAuthenticator().user_id);
    }
    this.storedCartItems.forEach(cartItem => {
      if (cartItem.productId === productId) {
        cartItem.aantal = aantal;
      }
    });
  }

  private alreadyInCart(productId: number): boolean {
    let inCart = false;
    this.storedCartItems.forEach(cartItem => {
      if (cartItem.productId === productId) {
        inCart = true;
      }
    });
    return inCart;
  }

  public delete(productId: number, userId: number) {
    this.api.delete('cart/' + userId + '&' + productId, this.authService.authorized$).subscribe(
      ifSuccess => {
        alert('Het item is verwijderd uit de database');
      },
      error => {
        alert('Het verwijderen is mislukt')  ;
      });
  }
  public save(cartItem: Cart) {
    this.api.post('cart/', cartItem, this.authService.authorized$).subscribe(
      ifSuccess => {
        alert('item is in de cart-database gezet!!');
      },
      error => {
        alert('Could not put to server: ' + error.message);
      });
  }
  public update(cartItem: Cart, userId: number) {
    this.api.put('cart/',  cartItem, this.authService.authorized$).subscribe(
      ifSuccess => {
        alert('item is ge-update');
      },
      error => {
        alert('Could not put to server: ' + error.message);
      });
  }

}
