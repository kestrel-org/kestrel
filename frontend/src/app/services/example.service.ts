import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
@Injectable({
  providedIn: "root",
})
export class ExampleService {

  BASEURL: string = environment.API_URL;

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": environment.ORIGIN_URL,
    }),
    withCredentials: true,
  };

  getUsers(): Promise<any> {
    return this.http.get(this.BASEURL + "example/users", this.httpOptions).toPromise();
  }

  getUsersById(id: number): Promise<any> {
    return this.http.get(this.BASEURL + "example/users/" + id, this.httpOptions).toPromise();
  }

  deleteUsersById(id: number): Promise<any> {
    return this.http.delete(this.BASEURL + "example/users?id=" + id, this.httpOptions).toPromise();
  }

  postUsers(login: string, password: string, email: string): Promise<any> {
    return this.http.post(this.BASEURL + "example/users", {login, password, email}, this.httpOptions).toPromise();
  }

  putUsers(id: number, login: string, password: string, email: string): Promise<any> {
    return this.http.put(this.BASEURL + "example/users", {id, login, password, email}, this.httpOptions).toPromise();
  }
}
