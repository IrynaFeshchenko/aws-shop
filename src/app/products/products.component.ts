import { Component, OnInit } from '@angular/core';
import { ProductsService } from './products.service';
import { Observable } from 'rxjs';
import { Product } from './product.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  readonly products$: Observable<
    Product[]
  > = this.productsService.getProducts();

  constructor(private readonly productsService: ProductsService, private router: Router) {}

  ngOnInit(): void {}
}
