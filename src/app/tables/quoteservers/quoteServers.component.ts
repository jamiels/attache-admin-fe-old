import { Component, OnInit, ViewChild } from "@angular/core";
import { DatatableComponent } from "@swimlane/ngx-datatable";
import { ModalDirective } from "ngx-bootstrap/modal";
import { BackendService } from "../../services/backend.service";
import { User } from "../../models/User";

@Component({
  selector: "quote-table",
  templateUrl: "./quoteServers.component.html",
  styleUrls: ["../advance/advance.component.scss"]
})
export class QuoteServersComponent implements OnInit {
  @ViewChild("addNewQuoteServerModal", { static: true })
  addNewQuoteServerModal: ModalDirective;

  name = null;
  ipAddress = null;
  port = null;
  authMessage = null;
  columnsDynamic = [
    { prop: "name", name: "Name" },
    { prop: "ipAddress", name: "IP Address" },
    { prop: "port", name: "Port" },
    { name: "Actions" }
  ];
  dynamicRows = [];
  @ViewChild(DatatableComponent, { static: false })
  tableDynamic: DatatableComponent;

  //No Option YET
  //https://github.com/swimlane/ngx-datatable/issues/423
  scrollBarHorizontal = window.innerWidth < 960;
  columnModeSetting = window.innerWidth < 960 ? "standard" : "force";

  constructor(private backendService: BackendService) {
    console.log(this.columnModeSetting);

    window.onresize = () => {
      this.scrollBarHorizontal = window.innerWidth < 960;
      this.columnModeSetting = window.innerWidth < 960 ? "standard" : "force";
    };
  }

  ngOnInit() {
    this.backendService.getAuthorizationToken().subscribe(data => {
      this.backendService.setToken(data.token);
      this.backendService.getData("quoteserver").subscribe(ress => {
        this.dynamicRows = ress;
      });
    });
  }

  showModal() {
    this.addNewQuoteServerModal.show();
  }

  sendQuoteServerMsg(id, msg) {
    this.backendService.sendMsgToQuoteServer(id, msg).subscribe(ress => {
      console.log(ress);
    });
  }

  logOut() {
    this.backendService.removeTokenFromLocalStorage();
  }

  addUser() {
    let { name, ipAddress, port, authMessage } = this;
    let temp = {
      name,
      ipAddress,
      port,
      authMessage
    };
    this.backendService
      .addNewRecord({ properties: temp }, "quoteserver")
      .subscribe(res => {
        console.log(res);
        this.dynamicRows = [...this.dynamicRows, res.created];
      });
    this.addNewQuoteServerModal.hide();
  }
}
