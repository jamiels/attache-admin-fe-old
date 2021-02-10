import { ModalDirective } from "ngx-bootstrap/modal";
import { BackendService } from "./services/backend.service";
import { pagesToggleService } from "./@pages/services/toggler.service";
import { SidebarComponent } from "./@pages/components/sidebar/sidebar.component";
declare var pg: any;

import {
  Component,
  OnInit,
  ViewEncapsulation,
  ViewChild,
  HostListener,
  ContentChild
} from "@angular/core";
//import { SimplywhiteComponent } from "./@pages/layouts/simplywhite/simplywhite.component";
import { RootLayout } from "./@pages/layouts/root/root.component";
import { QuoteServersComponent } from "./tables/quoteservers/quoteServers.component";
import { Router } from "@angular/router";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./@pages/layouts/simplywhite/simplywhite.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent extends RootLayout implements OnInit {
  title = "App works";
  login = null;
  password = null;
  showSide = true;
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
  //  @ViewChild("sideBrr", { static: false }) sideBrr: TemplateRef<void>;
  constructor(public toggler: pagesToggleService, public router: Router) {
    super(toggler, router);
    this.onResize();
  }
  ngOnInit() {
    this.changeLayout("menu-pin");
    //Will sidebar close on screens below 1024
    this.autoHideMenuPin();
    this.router.navigate(["users"]);
  }
}
