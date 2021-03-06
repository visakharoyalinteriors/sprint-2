import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardIndividualComponent } from "./dashboard-individual/dashboard-individual.component";
import { ROUTE_URL_PATH_CONSTANTS } from "../../commons/constants/route-url-path.constants";
import { RegistrationIndividualService } from "./registration-individual/registration-individual/registration-individual.service";
const routes: Routes = [
  {
    path: ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.INDIVIDUAL_DASHBOARD,
    component: DashboardIndividualComponent,
  },
];
const SERVICES_LIST = [RegistrationIndividualService];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [SERVICES_LIST],
})
export class IndividualRoutingModule {}
