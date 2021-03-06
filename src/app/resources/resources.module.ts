import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ResourcesRoutingModule } from "./resources-routing.module";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

//Modules
import { IndividualModule } from "./individual/individual.module";
import { OrganizationModule } from "./organization/organization.module";
import { MainScreenComponent } from "./main-screen/main-screen.component";
import { CommonsModule } from "../commons/commons.module";
import { QaModule } from "./qa/qa.module";
import { AdminModule } from "./admin/admin.module";
import { MaterialComponentsModule } from "../commons/material-components/material-components.module";

const RESOURCE_MODULE_LIST = [
  IndividualModule,
  OrganizationModule,
  QaModule,
  AdminModule,
];
const COMPONENTS_LIST = [MainScreenComponent];

@NgModule({
  declarations: [...COMPONENTS_LIST],
  imports: [
    CommonModule,
    ResourcesRoutingModule,
    ...RESOURCE_MODULE_LIST,
    CommonsModule,
    MaterialComponentsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [...RESOURCE_MODULE_LIST, COMPONENTS_LIST, ReactiveFormsModule, FormsModule],
})
export class ResourcesModule {}
