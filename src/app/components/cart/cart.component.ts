import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../services/product.service';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {CartService} from '../../services/cart.service';
import {Product} from '../../models/product.model';
import {Cart} from '../../models/cart.model';
import {Observable} from 'rxjs';

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

  constructor(private productService: ProductService,
              private userService: UserService,
              private cartService: CartService,
              private router: Router) { }

  ngOnInit() {
    this.storedItems = this.cartService.getCarts();
    console.log('cartitems: ' + this.storedItems);
    this.cartItems = this.cartService.getCart();
    this.convertCart();
  }

  private convertCart() {
    // this.cartItems.forEach(product => {
    //   if (!this.cart[product.productId]) {
    //     console.log('aantal: ' + [product.productId][1]);
    //     this.cart[product.productId] = [product, this.cart[product.productId][1] + 1];
    //
    //   }
    // });
  }




}
