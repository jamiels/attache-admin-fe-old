import { Component, OnInit, ViewChild } from "@angular/core";
import { DatatableComponent } from "@swimlane/ngx-datatable";
import { ModalDirective } from "ngx-bootstrap/modal";
import { BackendService } from "../../services/backend.service";
import { User } from "../../models/User";

@Component({
  selector: "app-advance",
  templateUrl: "./usersTable.component.html",
  styleUrls: ["./advance.component.scss"]
})
export class UsersTableComponent implements OnInit {
  @ViewChild("addNewAppModal", { static: true }) addNewAppModal: ModalDirective;

  @ViewChild("resetUserPwdModal", { static: true })
  resetUserPwdModal: ModalDirective;

  firstName = null;
  lastName = null;
  email = null;
  login = null;
  password = null;
  userResetPwdId = null;
  columnsDynamic = [
    { prop: "firstName", name: "First Name" },
    { prop: "lastName", name: "Last Name" },
    { prop: "email", name: "Email" },
    { prop: "isEnabled", name: "Actions" }
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
      this.backendService.getUsers().subscribe(ress => {
        this.dynamicRows = ress;
      });
    });
  }

  toggleFlag(id) {
    // Toggle in UI
    this.dynamicRows.map(el =>
      el.id === id ? { ...el, isEnabled: !el.isEnabled } : el
    );
    // Toggle on server
    this.backendService
      .changeFlag(id, "user")
      .subscribe(vid => console.log(vid));
  }

  showModal() {
    this.addNewAppModal.show();
  }

  showPwdModal(id) {
    this.resetUserPwdModal.show();
    this.userResetPwdId = id;
  }
  addUser() {
    let temp = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      isEnabled: true
    };
    let extendedTemp = {
      ...temp,
      login: this.login,
      password: this.password
    };
    //https://github.com/swimlane/ngx-datatable/issues/701
    this.backendService.addUser({ properties: extendedTemp }).subscribe(res => {
      console.log(res);
    });
    this.dynamicRows = [...this.dynamicRows, temp];
    this.addNewAppModal.hide();
  }
}
