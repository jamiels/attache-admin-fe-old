import { Routes } from "@angular/router";
import { VideosTableComponent } from "./tables/advance/videosTable.component";
import { UsersTableComponent } from "./tables/users/usersTable.component";
//Layouts
import { BlankSimplywhiteComponent } from "./@pages/layouts";

export const AppRoutes: Routes = [
  {
    path: "",
    component: BlankSimplywhiteComponent,
    children: [
      {
        path: "users",
        component: UsersTableComponent,
        data: {
          title: "users"
        }
      },
      {
        path: "videos",
        component: VideosTableComponent,
        data: {
          title: "videos"
        }
      }
    ]
  }
];
