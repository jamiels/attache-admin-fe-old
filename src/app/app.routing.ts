import { Routes } from "@angular/router";
import { VideosTableComponent } from "./tables/advance/videosTable.component";
import { UsersTableComponent } from "./tables/users/usersTable.component";
import { QuoteServersComponent } from "./tables/quoteservers/quoteServers.component";
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
          title: "Users"
        }
      },
      {
        path: "videos",
        component: VideosTableComponent,
        data: {
          title: "Videos"
        }
      },
      {
        path: "quoteservers",
        component: QuoteServersComponent,
        data: {
          title: "Quote Servers"
        }
      }
    ]
  }
];
