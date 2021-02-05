import { ModalDirective } from "ngx-bootstrap/modal";
import { BackendService } from "./services/backend.service";

import { Component, OnInit, ViewEncapsulation, ViewChild } from "@angular/core";
//import { SimplywhiteComponent } from "./@pages/layouts/simplywhite/simplywhite.component";
import { RootLayout } from "./@pages/layouts/root/root.component";
import { QuoteServersComponent } from "./tables/quoteservers/quoteServers.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./@pages/layouts/simplywhite/simplywhite.component.scss"]
})
export class AppComponent extends RootLayout implements OnInit {
  title = "App works";
  login = null;
  password = null;
  menuLinks = [
    {
      label: "Users",
      routerLink: "users",
      iconType: "fi",
      iconName: "users"
    },
    {
      label: "Videos",
      routerLink: "videos",
      iconType: "fi",
      iconName: "list"
    },
    {
      label: "Quote servers",
      routerLink: "quoteservers",
      iconType: "fi",
      iconName: "cpu"
    }
  ];

  constructor(private backendService: BackendService) {}

  ngOnInit() {
    //Will sidebar close on screens below 1024
    this.autoHideMenuPin();
  }
}
