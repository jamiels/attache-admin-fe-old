import { BackendService } from "../services/backend.service";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree
} from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private backendService: BackendService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> {
    console.log(localStorage.getItem("token"));
    console.log(!!localStorage.getItem("token"));
    console.log(localStorage.getItem("tokenExpiresIn"));
    if (
      !!localStorage.getItem("token") &&
      Date.now() < parseInt(localStorage.getItem("tokenExpirationDate"))
    ) {
      console.log("auth ok");
      this.backendService.setToken(localStorage.getItem("token"));
      return true;
    }
    return this.router.createUrlTree(["login"]);
  }
}
