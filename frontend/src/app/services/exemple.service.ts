import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";

import { lastValueFrom } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ExempleService {

  BASEURL: string = environment.API_URL;

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://localhost:4200",
    }),
    withCredentials: true,
  };

  getUsers(): Promise<any> {
    return lastValueFrom(this.http.get(this.BASEURL + "exemple/users", this.httpOptions));
  }

  getUsersById(id: number): Promise<any> {
    return lastValueFrom(this.http.get(this.BASEURL + "exemple/users/" + id, this.httpOptions));
  }

  deleteUsersById(id: number): Promise<any> {
    return lastValueFrom(this.http.delete(this.BASEURL + "exemple/users?id=" + id, this.httpOptions));
  }

  postUsers(login: string, password: string, email: string): Promise<any> {
    return lastValueFrom(this.http.post(this.BASEURL + "exemple/users", {login, password, email}, this.httpOptions));
  }

  putUsers(id: number, login: string, password: string, email: string): Promise<any> {
    return lastValueFrom(this.http.put(this.BASEURL + "exemple/users", {id, login, password, email}, this.httpOptions));
  }
}
