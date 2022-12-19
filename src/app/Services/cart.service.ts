import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Movie } from '../Models/movie';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  CartArr: any = []
  CartLength = new BehaviorSubject(0);
  Cart = new BehaviorSubject([]);
  constructor() { }
  getLength(): any {
    let arr: any
    this.CartLength.subscribe({
      next: (v) => arr = v
    });
    return arr
  }
  AddToLength() {
    this.CartLength.next(this.get().length)
  }
  AddToCart(item: Movie) {
    this.CartArr.push(item)
    this.Cart.next(this.CartArr)
  }
  get(): any {
    let arr: any
    this.Cart.subscribe({
      next: (v) => arr = v
    });
    return arr
  }
  RemoveFromCart(id: number) {
    this.CartArr = this.CartArr.filter((item: any) => {
      return item.id != id
    })
    this.Cart.next(this.CartArr)
    console.log(this.CartArr);
  }

}