import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../services/product.service';
import {Product} from '../../models/product.model';
import {Subscription} from 'rxjs';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private productService: ProductService, private userService: UserService) { }

  products$: Product[];
  user: User = new User();
  sub: Subscription;

  ngOnInit() {
    this.sub = this.productService.getAll().subscribe(data => {
      this.products$ = data;
    });
    this.sub = this.userService.getAll(1).subscribe(data => {
      this.user = data;
    });
  }
}
