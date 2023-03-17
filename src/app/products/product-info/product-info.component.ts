import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { map, shareReplay, tap } from "rxjs/operators";
import { CartService } from "src/app/cart/cart.service";
import { CartCountControlsComponent } from "src/app/core/cart-count-controls/cart-count-controls.component";
import { Product } from "../product.interface";
import { ProductsService } from "../products.service";

@Component({
  selector: "app-product-info",
  templateUrl: "./product-info.component.html",
  styleUrls: ["./product-info.component.scss"],
})
export class ProductInfoComponent implements OnInit, OnDestroy {
  private routeSubscription!: Subscription;
  productId!: string;
  product$!: Observable<Product>;

  @ViewChild("cartBtn", { static: false, read: ElementRef }) cartBtn:
    | ElementRef<HTMLButtonElement>
    | undefined;
  @ViewChild("controls", { static: false }) countControls:
    | CartCountControlsComponent
    | undefined;

  countInCart$!: Observable<number>;

  constructor(
    private readonly cartService: CartService,
    private readonly productsService: ProductsService,
    private route: ActivatedRoute
  ) {}

  get id(): string {
    return this.productId;
  }

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe((params) => {
      console.log(params["id"]);
      this.product$ = this.productsService.getProductById(params["id"]);
    });
    this.countInCart$ = this.cartService.cart$.pipe(
      map((cart) => {
        if (!(this.id in cart)) {
          return 0;
        }

        return cart[this.id];
      }),
      this.updateFocusIfNeeded(),
      shareReplay({
        bufferSize: 1,
        refCount: true,
      })
    );
  }

  add(): void {
    this.cartService.addItem(this.id);
  }

  remove(): void {
    this.cartService.removeItem(this.id);
  }

  /** Move focus to a corresponding control when controls switch */
  private updateFocusIfNeeded() {
    let prev: number;

    return (observable: Observable<number>): Observable<number> =>
      observable.pipe(
        tap((curr) => {
          if (prev === 0 && curr === 1) {
            setTimeout(() => this.countControls?.focusAddBtn());
          } else if (prev === 1 && curr === 0) {
            setTimeout(() => this.cartBtn?.nativeElement.focus());
          }

          prev = curr;
        })
      );
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }
}
