import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";

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

  constructor(private http: HttpClient) {
    /*
    this.http
      .post<any>(`${this.baseURL}/authenticate`, credentials)
      .subscribe(data => {
        console.log(data);
        httpOptions.headers = httpOptions.headers.set(
          "Authorization",
          data.token
        );
      }); */
  }

  removeTokenFromLocalStorage() {
    localStorage.removeItem("token");
  }

  getAuthorizationToken(login, password): Observable<any> {
    const credentials = {
      login,
      password
    };
    return this.http.post<any>(`${this.baseURL}/authenticate`, credentials);
  }

  setToken(token) {
    localStorage.setItem("token", token);
    httpOptions.headers = httpOptions.headers.set("Authorization", token);
  }

  getData(recordType: string): Observable<any[]> {
    const token = localStorage.getItem("token");
    httpOptions.headers = httpOptions.headers.get("Authorization", token);
    return this.http.get<any[]>(`${this.baseURL}/${recordType}`, httpOptions);
  }

  resetUserPassword(id: number, password: string): Observable<any> {
    const token = localStorage.getItem("token");
    httpOptions.headers = httpOptions.headers.get("Authorization", token);
    return this.http.post<any>(
      `${this.baseURL}/resetUserPassword`,
      { id, password },
      httpOptions
    );
  }

  addNewRecord(record: any, recordType: string): Observable<any[]> {
    const token = localStorage.getItem("token");
    httpOptions.headers = httpOptions.headers.get("Authorization", token);
    console.log(record);
    return this.http.post<any>(
      `${this.baseURL}/${recordType}`,
      record,
      httpOptions
    );
  }

  changeFlag(id: number, recordType: string): Observable<any> {
    const token = localStorage.getItem("token");
    httpOptions.headers = httpOptions.headers.get("Authorization", token);
    return this.http.put(
      `${this.baseURL}/changeFlag/${recordType}/${id}`,
      {},
      httpOptions
    );
  }

  sendMsgToQuoteServer(id: number, msg: string): Observable<any> {
    const token = localStorage.getItem("token");
    httpOptions.headers = httpOptions.headers.get("Authorization", token);
    return this.http.get<any>(
      `${this.baseURL}/quoteserver/${id}/${msg}`,
      httpOptions
    );
  }
}
