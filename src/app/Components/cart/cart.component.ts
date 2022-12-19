import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/Models/movie';
import { ApiService } from 'src/app/Services/api.service';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  waiting = true
  listOfMovies: Movie[] = []
  constructor(private router: Router, private cart: CartService) { }
  Setwaiting() {
    setTimeout(() => {
      this.waiting = false
    }, 1000)
  }
  RemoveFromCart(id: number) {
    this.cart.RemoveFromCart(id)
    this.cart.AddToLength()
    this.ngOnInit()
  }
  ngOnInit(): void {
    this.Setwaiting()
    this.GetAllMovies()
  }
  GetAllMovies() {
    this.listOfMovies = this.cart.get()
  }
}
