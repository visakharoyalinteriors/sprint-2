import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { OrganizationRoutingModule } from "./organization-routing.module";
import { RegistrationOrganizationComponent } from "./registration-organization/registration-organization.component";
import { CommonsModule } from "src/app/commons/commons.module";
import { DirectivesModule } from "src/app/commons/directives/directives.module";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { EditProfileOrganizationComponent } from "./edit-profile-organization/edit-profile-organization.component";
import { ManageCandidatesComponent } from "./manage-candidates/manage-candidates.component";
import { ManageHrTeamComponent } from "./manage-hr-team/manage-hr-team.component";
import { ManageEventsComponent } from "./manage-events/manage-events.component";
import { OnGoingEventOrganizationComponent } from "./on-going-event-organization/on-going-event-organization.component";

const COMPONENTS_LIST = [
  RegistrationOrganizationComponent,
  EditProfileOrganizationComponent,
  ManageCandidatesComponent,
  ManageHrTeamComponent,
  ManageEventsComponent,
  OnGoingEventOrganizationComponent,
];

@NgModule({
  declarations: [...COMPONENTS_LIST],
  imports: [
    CommonModule,
    OrganizationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonsModule,
    DirectivesModule,
    FontAwesomeModule,
  ],
  exports: [...COMPONENTS_LIST],
})
export class OrganizationModule {}
