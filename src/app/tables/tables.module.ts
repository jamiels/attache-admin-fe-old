import { UsersTableComponent } from "./users/usersTable.component";
//Angular Dependencies
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
//Router
import { TableRoutes } from "./tables.routing";

//Core Pages Layout Components
import { SharedModule } from "../@pages/components/shared.module";

//Thirdparty Dependencies - table and model
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { ModalModule } from "ngx-bootstrap";

import { AdvanceComponent } from "./advance/advance.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(TableRoutes),
    SharedModule,
    NgxDatatableModule,
    ModalModule
  ],
  declarations: [AdvanceComponent]
})
export class TablesModule {}
