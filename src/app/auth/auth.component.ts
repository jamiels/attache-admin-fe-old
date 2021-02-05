import { ModalDirective } from "ngx-bootstrap/modal";
import { Component, OnInit, ViewEncapsulation, ViewChild } from "@angular/core";
//import { SimplywhiteComponent } from "./@pages/layouts/simplywhite/simplywhite.component";
import { BackendService } from "../services/backend.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html"
})
export class AuthComponent {
  title = "App works";
  login = null;
  password = null;
  constructor(private backendService: BackendService, private router: Router) {}

  authUser() {
    console.log(this.login);
    console.log(this.password);
    this.backendService
      .getAuthorizationToken(this.login, this.password)
      .subscribe(res => {
        console.log(res);
        localStorage.setItem("token", res.token);
        localStorage.setItem("tokenExpirationDate", res.tokenExpiresIn);
        this.backendService.setToken(res.token);
        this.router.navigate(["users"]);
        // moved navigation to the service
      });
  }
}
