import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {AuthorizationService} from './authorization.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Product} from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  constructor(private api: ApiService,
              private authService: AuthorizationService,
              private router: Router) {

  }

  public getAll(): Observable<Product[]> {
    return this.api.get<Product[]>('products');
  }



  public save(product: Product) {
    this.api.put('products/' + product.productId, this.authService.authorized$).subscribe(
      res => {
        console.log('Saved: ' + product.naam);
      },
      err => {
        console.log('Product not saved.');
      }
    );
  }

  public saveMultiple(products: Product[]) {
    products.forEach(item => {
      this.api.put('user/' + item.productId, item).subscribe(
        ifSuccess => {

        },
        error => {
          alert('Could not put to server: ' + error.message);
        }
      );
    });
  }
}
