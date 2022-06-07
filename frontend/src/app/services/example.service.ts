import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { lastValueFrom } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ExampleService {
  BASEURL: string = environment.API_URL;

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    withCredentials: true,
  };

  getUsers(): Promise<any> {
    return lastValueFrom(this.http.get(`${this.BASEURL}example/users`, this.httpOptions));
  }

  getUsersById(id: number): Promise<any> {
    return lastValueFrom(this.http.get(`${this.BASEURL}example/users/${id}`, this.httpOptions));
  }

  deleteUsersById(id: number): Promise<any> {
    return lastValueFrom(this.http.delete(`${this.BASEURL}example/users/${id}`, this.httpOptions));
  }

  postUsers(login: string, password: string, email: string): Promise<any> {
    return lastValueFrom(this.http.post(`${this.BASEURL}example/users`, { login, password, email }, this.httpOptions));
  }

  putUsers(id: number, login: string, password: string, email: string): Promise<any> {
    return lastValueFrom(this.http.put(`${this.BASEURL}example/users`, { id, login, password, email }, this.httpOptions));
  }
}
