import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  ErrorLogin=false
  constructor(private fb: FormBuilder, private router: Router, private api: ApiService) { }
  LoginForm = this.fb.group({
    email: (['', [Validators.required]]),
    password: (['', [Validators.required]])
  })


  get email() {
    return this.LoginForm.get('email')
  }
  get password() {
    return this.LoginForm.get('password')
  }



  Login() {
    var { email, password    } = this.LoginForm.value
const formData= new FormData()
formData.append('email',email || '')
formData.append('password',password || '')
console.log(formData);

    this.api.post('api/login', formData).subscribe({
      next: (data) => {
        const arr : any = data
        console.log(data);
        
        const token = arr.authorisation.token
        localStorage.setItem('token',token)
      this.router.navigate(['/pages/home'])

      },
      error: (msg) => {
        this.ErrorLogin=true
        this.email?.reset()
        this.password?.reset() 
      }


    })

  }

  GoToRegister(){
    this.router.navigate(['/userregister'])
  }
}
