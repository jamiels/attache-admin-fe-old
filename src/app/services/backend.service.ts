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

  getVideos(): Observable<Video[]> {
    return this.http.get<Video[]>(`${this.baseURL}/video`, httpOptions);
  }
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseURL}/user`, httpOptions);
  }

  addVideo(video: any): Observable<Video> {
    console.log(video);
    return this.http.post<Video>(`${this.baseURL}/video`, video, httpOptions);
  }

  addUser(user: any): Observable<User> {
    console.log(user);
    return this.http.post<User>(`${this.baseURL}/user`, user, httpOptions);
  }

  changeFlag(id: number, recordName: string): Observable<any> {
    return this.http.put(`${this.baseURL}/changeFlag/${recordName}/${id}`);
  }

  /*
  // Delete Todo
  deleteTodo(todo:Todo):Observable<Todo> {
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http.delete<Todo>(url, httpOptions);
  }

  // Add Todo
  addTodo(todo:Todo):Observable<Todo> {
    return this.http.post<Todo>(this.todosUrl, todo, httpOptions);
  }

  // Toggle Completed
  toggleCompleted(todo: Todo):Observable<any> {
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http.put(url, todo, httpOptions);
  } */
}
