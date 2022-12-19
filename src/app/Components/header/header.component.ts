import { Component } from '@angular/core';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  CartNumber:number=0
  constructor( private cart: CartService) {
  }
  ngOnInit(): void {

    this.calcCartItems()
  }

  calcCartItems(){
   return this.cart.getLength()
    }

    logOut(){
      localStorage.clear()
    }
}
