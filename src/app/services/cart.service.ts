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
    this.api.get<Cart[]>('cart/' + this.authService.getAuthenticator().user_id, this.authService.authorized$)
      .subscribe(items => {
        this.storedCartItems = items;
        items.forEach(item => {
          this.productService.getProduct(item.productId).subscribe(product => {
            for (let i = 0; i < item.aantal; i++) {
              this.cartItems.push(product);
            }
          }, error => {
            alert('geen opgeslagen producten');
          });
        });
      });
  }

  // private fillCart(Product product) {
  //   // sessionStorage.setItem('1', JSON.stringify(parsedResult.product));
  //
  // }
  public getCarts(): Cart[] {
    return this.storedCartItems;
  }
  public getCart(): Product[] {
    console.log('de cartitems in cartservice: ' + this.cartItems);
    return this.cartItems;
  }
  public addToCarts(product: Product) {
    if (!this.alreadyInCart(product.productId)) {
      this.storedCartItems.push(new Cart(null,
        this.authService.getAuthenticator().user_id, product.productId, 1));
    }
  }
  public addToCart(product: Product) {
    // const currentValue = this.cartItem$.value;
    // const updatedValue = [...currentValue, product];
    this.cartItems.push(product);
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
  public saveMultiple(cartItems: Cart[]) {
    cartItems.forEach(item => {
      this.api.put('cart/' + item.cartId, item, this.authService.authorized$).subscribe(
        ifSuccess => {
          confirm('item is in de cart gezet!!');
        },
        error => {
          alert('Could not put to server: ' + error.message);
        }
      );
    });
  }
}
