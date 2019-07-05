import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {ProductService} from '../../services/product.service';
import {Product} from '../../models/product.model';
import {Observable, Subscription} from 'rxjs';
import {CartService} from '../../services/cart.service';

@Component({
  selector: 'app-omschrijving',
  templateUrl: './product-omschrijving.component.html',
  styleUrls: ['./product-omschrijving.component.css']
})
export class ProductOmschrijvingComponent implements OnInit {
  private product: Product;
  private id: number;
  public ready = false;
  sub: Subscription;
  constructor(private route: ActivatedRoute, private productService: ProductService,
              private cartService: CartService) { }

  ngOnInit() {
    this.sub = this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.productService.getProduct(this.id).subscribe(data => {
            this.product = data;
            this.ready = true;
          });
    });
    this.sub.unsubscribe();

  }
  public koop() {
    this.cartService.addToCarts(this.product);
  }

}


