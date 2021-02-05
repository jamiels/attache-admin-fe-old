import { BackendService } from "../services/backend.service";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree
} from "@angular/router";
import { Injectable } from "@angular/core";

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
      Date.now() < localStorage.getItem("tokenExpirationDate")
    ) {
      this.backendService.setToken(localStorage.getItem("token"));
      return true;
    }
    return this.router.createUrlTree(["login"]);
  }
}
