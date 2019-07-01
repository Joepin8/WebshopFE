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

  products$: Observable<Product[]>;

  constructor(private api: ApiService,
              private authService: AuthorizationService,
              private router: Router) {
    this.products$  = this.api.get<Product[]>('products');
  }

  public getAll(): Observable<Product[]> {
    return this.products$;
  }
  public getProduct(id: number): Observable<Product> {
    console.log('hij doet dit...');
    return this.api.get<Product>('products/' + id);
  }

  public saveMultiple(products: Product[]) {
    products.forEach(item => {
      this.api.put('products/' + item.productId, item, this.authService.authorized$).subscribe(
        ifSuccess => {

        },
        error => {
          alert('Could not put to server: ' + error.message);
        }
      );
    });
  }
}
