import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/Models/movie';
import { ApiService } from 'src/app/Services/api.service';
import { Location } from '@angular/common';
import { CartService } from 'src/app/Services/cart.service';
@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent {
  ProductID = ""
  movie: Movie = {} as Movie
  listOfMovie: Movie[] = []
  IndexArr: any = []
  CurrentID: number = 0
  cuurentIndex: number = 0
  isEmpty: boolean = false
  CartArr:any=[]
  constructor(private activeRouter: ActivatedRoute,
    private api: ApiService,
    private router: Router, private cart: CartService) {
  }

  ngOnInit(): void {
    this.activeRouter.paramMap.subscribe(paramMap => {
      this.CurrentID = (paramMap.get('id')) ? Number(paramMap.get('id')) : 0;
      this.api.get('api/movies').subscribe({
        next: (data) => {
          const arr: any = data
          this.listOfMovie = arr.message
          this.movie = this.listOfMovie[this.MovieIndex(this.CurrentID)]  
        },
        error: (msg) => {
          if (msg.error.message === 'Unauthenticated.') {
            this.router.navigate(['/userlogin'])
            localStorage.clear()
          }
          else{
            console.log(msg); 
          }
        }
      })
    

    })
    
  }
  Gonext() {
    if (!this.listOfMovie[++this.cuurentIndex]) {
      this.cuurentIndex = 0
      this.router.navigate(['/pages/moviesDetails/', this.listOfMovie[this.cuurentIndex].id])
    }
    else {
      this.cuurentIndex = this.listOfMovie.findIndex((item) => item.id == this.CurrentID);
      this.router.navigate(['/pages/moviesDetails/', this.listOfMovie[++this.cuurentIndex].id])
    }

  }
  Goprev() {
    if (!this.listOfMovie[--this.cuurentIndex]) {
      this.cuurentIndex = this.listOfMovie.length - 1
      this.router.navigate(['/pages/moviesDetails/', this.listOfMovie[this.cuurentIndex].id])
    }
    else {

      this.cuurentIndex = this.listOfMovie.findIndex((item) => item.id == this.CurrentID);
      this.router.navigate(['/pages/moviesDetails/', this.listOfMovie[--this.cuurentIndex].id])
    }
  }
  goback() {
    this.router.navigate(['/pages/movies']);
  }
  AddToCard() {
    this.CartArr=this.cart.get()  
    
    if(this.CartArr.includes(this.movie)){
      alert('this item alrady in your cart')

    }
    else{

      this.cart.AddToCart(this.movie)    
      this.cart.AddToLength()
      console.log(this.CartArr);
    }
  
        
        
      } 



  MovieIndex(_id: number) {

    return this.listOfMovie.findIndex((elem) => {
      return elem.id === _id
    })
  }
}
