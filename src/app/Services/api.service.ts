import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  get(path: string, config?: object) {
    return this.http.get('https://test-api.storexweb.com/' + path, {
      ...config,
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getToken()}`
      }),
    })
  }


  post(path: string, body: any, config?: object) {
    return this.http.post('https://test-api.storexweb.com/' + path, body, {
      ...config,
      headers: new HttpHeaders({
        'encType': "multipart/form-data",
        'Authorization': `Bearer ${this.getToken()}`

      }),
    });
  }



  put(path: string, body: any, config?: object) {
    return this.http.put('https://test-api.storexweb.com/' + path, body, {
      ...config,
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getToken()}`

      }),
    });
  }

  delete(path: string, config?: object) {
    return this.http.delete('https://test-api.storexweb.com/' + path, {
      ...config,
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getToken()}`

      }),
    });
  }


  getToken() {


    return localStorage.getItem("token")
  }
}
