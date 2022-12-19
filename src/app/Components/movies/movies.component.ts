import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/Models/movie';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent {

  listOfMovies: Movie[] = []
  film = ''
  waiting = true
  constructor(private router: Router, private api: ApiService) { }
  ngOnInit(): void {
    this.Setwaiting()
    this.GetAllMovies()
  }

  GetAllMovies() {
    this.api.get('api/movies').subscribe({
      next: (data) => {
        const arr: any = data
        console.log(data);
        this.listOfMovies = arr.message

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
  }

  GoToMovies(movie: Movie) {
    this.router.navigate(['/pages/moviesDetails/', movie.id])
  }

  Setwaiting() {
    setTimeout(() => {
      this.waiting = false
    }, 1000)
  }
}
