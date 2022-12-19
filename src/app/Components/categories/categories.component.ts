import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Categorie } from 'src/app/Models/categorie';
import { Movie } from 'src/app/Models/movie';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  listOfCateg: Categorie[] = []
  listOfMovies: Movie[] = []
  waiting = true
  constructor(private router: Router, private api: ApiService) { }
  ngOnInit(): void {
    this.Setwaiting()
    this.GetAllCat()
    this.GetAllMovies()
  }
  GetAllCat() {
    this.api.get('api/category').subscribe({
      next: (data) => {
        const arr: any = data
        console.log(data);
        this.listOfCateg = arr.message

      },
      error: (msg) => {
        console.log(msg);



      }


    })
  }
  GetAllMovies() {
    this.api.get('api/movies').subscribe({
      next: (data) => {
        const arr: any = data
        console.log(data);
        this.listOfMovies = arr.message

      },
      error: (msg) => {
        console.log(msg);



      }


    })
  }
  Setwaiting() {
    setTimeout(() => {
      this.waiting = false
    }, 1000)
  }
  showCateMovies(event: any) {
const id = event.target.value
if(id > 0){
  this.api.get('api/moviesByCategory/' + id).subscribe({
    next: (data) => {
      const arr: any = data
      console.log(data);
      this.listOfMovies = arr.message
    },
    error: (msg) => {
      console.log(msg);
    }


  })
}
else{
  this.ngOnInit()
}

  }
  GoToMovies(movie: Movie) {
    this.router.navigate(['/pages/moviesDetails/', movie.id])
  }
}
