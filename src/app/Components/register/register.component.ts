import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  ErrorRegister=false
  constructor(private fb: FormBuilder, private router: Router, private api: ApiService) { }
  RegisterForm = this.fb.group({
    email: (['', [Validators.required]]),
    password: (['', [Validators.required]]),
    name: (['', [Validators.required]])

  })


  get email() {
    return this.RegisterForm.get('email')
  }
  get password() {
    return this.RegisterForm.get('password')
  }
  get name() {
    return this.RegisterForm.get('name')
  }



  Register() {
    var { email, password  ,name  } = this.RegisterForm.value
const formData= new FormData()
formData.append('email',email || '')
formData.append('password',password || '')
formData.append('name',name || '')

console.log(formData);

    this.api.post('api/register', formData).subscribe({
      next: (data) => {
        const arr : any = data
        console.log(data);
        
        const token = arr.authorisation.token
        localStorage.setItem('token',token)
      this.router.navigate(['/pages/home'])

      },
      error: (msg) => {
        this.email?.reset()
        this.password?.reset()
        this.name?.reset()
      }


    })

  }

  GoToLogin(){
    this.router.navigate(['/userlogin'])
  }
}
