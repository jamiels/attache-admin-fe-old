import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

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
    const credentials = {
      login: "placeholder",
      password: "placeholder"
    };
    this.http
      .post<any>(`${this.baseURL}/authenticate`, credentials)
      .subscribe(data => {
        console.log(data);
        localStorage.setItem("token", data.token);
        httpOptions.headers = httpOptions.headers.set(
          "Authorization",
          data.token
        );
      });
  }

  getAuthorizationToken(): Observable<any> {
    const credentials = {
      login: "placeholder",
      password: "placeholder"
    };
    return this.http.post<any>(`${this.baseURL}/authenticate`, credentials);
  }

  setToken(token) {
    localStorage.setItem("token", token);
    httpOptions.headers = httpOptions.headers.set("Authorization", token);
  }

  getData(recordType: string): Observable<any[]> {
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
    return this.http.put<any>(`${this.baseURL}/changeFlag/${recordType}/${id}`);
  }

  sendMsgToQuoteServer(id: number, msg: string): Observable<any> {
    return this.http.get<any>(`${this.baseURL}/${id}/${msg}`);
  }
}
