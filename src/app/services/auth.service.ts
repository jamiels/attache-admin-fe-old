import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};

@Injectable()
export class AuthService {
  baseURL: string = "http://localhost:9000";

  constructor(private http: HttpClient) {}

  public getToken(): string {
    return localStorage.getItem("token");
  }

  getAuthorizationToken(): any {
    const credentials = {
      login: environment.login,
      password: environment.password
    };
    this.http
      .post<any>(`${this.baseURL}/authenticate`, credentials)
      .subscribe(data => {
        console.log(data);
        return data.token;
      });
  }
}
