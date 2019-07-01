import { Component, OnInit } from '@angular/core';
import {Product} from '../../models/product.model';
import {Subscription} from 'rxjs';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products$: Product[];
  sub: Subscription;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.sub = this.productService.getAll().subscribe(data => {
      this.products$ = data;
    });
  }

}
