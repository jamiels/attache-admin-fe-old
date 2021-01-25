import { Routes } from "@angular/router";
import { AdvanceComponent } from "./advance/advance.component";

export const TableRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "users",
        component: AdvanceComponent,
        data: {
          title: "users"
        }
      },
      {
        path: "videos",
        component: AdvanceComponent,
        data: {
          title: "videos"
        }
      }
    ]
  }
];
