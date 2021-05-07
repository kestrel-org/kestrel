import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
@Injectable({
  providedIn: "root",
})
export class ExempleService {

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
    return this.http.get(this.BASEURL + "exemple/users", this.httpOptions).toPromise();
  }

  getUsersById(id: number): Promise<any> {
    return this.http.get(this.BASEURL + "exemple/users/" + id, this.httpOptions).toPromise();
  }

  deleteUsersById(id: number): Promise<any> {
    return this.http.delete(this.BASEURL + "exemple/users?id=" + id, this.httpOptions).toPromise();
  }

  postUsers(login: string, password: string, email: string): Promise<any> {
    return this.http.post(this.BASEURL + "exemple/users", {login, password, email}, this.httpOptions).toPromise();
  }

  putUsers(id: number, login: string, password: string, email: string): Promise<any> {
    return this.http.put(this.BASEURL + "exemple/users", {id, login, password, email}, this.httpOptions).toPromise();
  }
}
