import { Component, OnInit, ViewChild } from "@angular/core";
import { DatatableComponent } from "@swimlane/ngx-datatable";
import { ModalDirective } from "ngx-bootstrap/modal";
import { BackendService } from "../../services/backend.service";
import { Video } from "../../models/Video";

@Component({
  selector: "app-advance",
  templateUrl: "./advance.component.html",
  styleUrls: ["./advance.component.scss"]
})
export class VideosTableComponent implements OnInit {
  @ViewChild("addNewAppModal", { static: true }) addNewAppModal: ModalDirective;

  vidName = null;
  ytURL = null;

  columnsDynamic = [
    { prop: "name", name: "Video Name" },
    { prop: "url", name: "Youtube URL" },
    { prop: "CREATED_DT", name: "Created Date Time" },
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
      this.backendService.getVideos().subscribe(videos => {
        this.dynamicRows = videos;
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
      .changeFlag(id, "video")
      .subscribe(vid => console.log(vid));
  }

  showModal() {
    this.addNewAppModal.show();
  }
  addVideo() {
    let temp = {
      name: this.vidName,
      url: this.ytURL,
      isEnabled: true
    };
    //https://github.com/swimlane/ngx-datatable/issues/701
    this.backendService.addVideo({ properties: temp }).subscribe(res => {
      console.log(res);
    });
    this.dynamicRows = [...this.dynamicRows, temp];
    this.addNewAppModal.hide();
  }
}
