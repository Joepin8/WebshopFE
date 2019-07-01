import {Component, Input, OnInit} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {Product} from '../../models/product.model';
import {Subscription} from 'rxjs';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user.model';
import {Router} from '@angular/router';
import {stringify} from 'querystring';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input()
  product: Product;
  @Input()
  index: number;
  sub: Subscription;

  constructor(private productService: ProductService,
              private userService: UserService,
              private router: Router) { }

  ngOnInit() {

  }
  public toDetails() {
    const s = String(this.index);
    if ( s !== null) {
      this.router.navigate(['products/', s]);
    }


  }
}
