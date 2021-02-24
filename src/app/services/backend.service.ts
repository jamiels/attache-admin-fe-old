import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Router } from "@angular/router";
import { User } from "../models/User";
import { Video } from "../models/Video";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};

interface GetVids {
  msg: string;
  success: boolean;
  videos: Video[];
}

@Injectable({
  providedIn: "root"
})
export class BackendService {
  baseURL: string = "http://localhost:9000";

  constructor(private http: HttpClient, private router: Router) {}

  removeTokenFromLocalStorage() {
    localStorage.removeItem("token");
  }

  getAuthorizationToken(email, password): Observable<any> {
    const credentials = {
      email,
      password
    };
    return this.http.post<any>(`${this.baseURL}/authenticate`, credentials);
  }

  setToken(token) {
    httpOptions.headers = httpOptions.headers.set("Authorization", token);
    //this.router.navigate(["users"]);
  }

  logOut() {
    httpOptions.headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpirationDate");
    this.router.navigate(["login"]);
  }

  getData(recordType: string): Observable<any[]> {
    //  const token = localStorage.getItem("token");
    //httpOptions.headers = httpOptions.headers.get("Authorization", token);
    return this.http.get<any[]>(`${this.baseURL}/${recordType}`, httpOptions);
  }

  resetUserPassword(id: number, password: string): Observable<any> {
    return this.http.post<any>(
      `${this.baseURL}/resetUserPassword`,
      { id, password },
      httpOptions
    );
  }

  addNewRecord(record: any, recordType: string): Observable<any[]> {
    console.log(record);
    return this.http.post<any>(
      `${this.baseURL}/${recordType}`,
      record,
      httpOptions
    );
  }

  changeFlag(id: number, recordType: string): Observable<any> {
    return this.http.put(
      `${this.baseURL}/changeFlag/${recordType}/${id}`,
      {},
      httpOptions
    );
  }

  sendMsgToQuoteServer(id: number, msg: string): Observable<any> {
    return this.http.get<any>(
      `${this.baseURL}/quoteserver/${id}/${msg}`,
      httpOptions
    );
  }
}
