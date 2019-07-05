import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../services/product.service';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {CartService} from '../../services/cart.service';
import {Product} from '../../models/product.model';
import {Cart} from '../../models/cart.model';
import {User} from '../../models/user.model';
import {AuthorizationService} from '../../services/authorization.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  storedItems: Cart[];
  cartItems: Product[] = [];
  cart: {[id: number]: [Product, number]} = {};
  ready = false;
  user: User;
  totaal = 0;

  constructor(private productService: ProductService,
              private userService: UserService,
              private cartService: CartService,
              private router: Router,
              private authService: AuthorizationService) { }

  ngOnInit() {
    this.storedItems = this.cartService.getCarts();
    this.convertCart();
    if (this.authService.hasAuthorization()) {
      this.user = this.authService.getAuthenticator();
    } else {
      this.user = new User();
    }
  }

  private convertCart() {
    this.storedItems.forEach(cartItem => {
      this.productService.getProduct(cartItem.productId)
        .subscribe(item => {
          this.cart[item.productId] = [item, cartItem.aantal];
          this.totaal += +(item.prijs * cartItem.aantal).toFixed(2);
          this.totaal = +(this.totaal).toFixed(2);
        });
    });
  }
  public checkForZero(id: string) {
    const idNumber = +id;
    if (this.cart[id][1] < 1) {
      if (confirm('Wil je dit item verwijderen?')) {
        delete this.cart[id];
        this.cartService.deleteFromCarts(idNumber);
      } else {
        this.cart[idNumber] = [this.cart[id][0], 1];
      }
    }

  }
  public getBTW(): number {
    const btw = 0.21;
    return +(btw * this.totaal).toFixed(2);
  }
  public getTotaal() {
    this.totaal = 0;
    for (let key in this.cart) {
      this.totaal += this.cart[key][0].prijs * this.cart[key][1];
    }
    console.log(this.totaal);
    this.totaal = +this.totaal.toFixed(2);
  }
  public getIncl(): number {
    return +(this.totaal+ this.getBTW()).toFixed(2);
  }

  public trackByFn(i: number) {
    return i;
  }


}
