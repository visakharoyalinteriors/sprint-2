import { Component, Input, ChangeDetectorRef } from "@angular/core";
import { ManageHeaderService } from "./commons/services/manage-header/manage-header.service";
import { Router } from "@angular/router";
import { FormGroup, FormControl } from "@angular/forms";
import { ROUTE_URL_PATH_CONSTANTS } from "./commons/constants/route-url-path.constants";
import { AlertService } from "./commons/services/alert/alert.service";
import { Alerts } from "./commons/typings/typings";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "EnterVu";
  public isHeaderVisible: boolean;
  private alertsList: Alerts[];

  constructor(
    public manageHeaderService?: ManageHeaderService,
    private cdr?: ChangeDetectorRef,
    public router?: Router,
    public alertService?: AlertService
  ) {
    this.isHeaderVisible = false;
    if (
      this.manageHeaderService &&
      this.manageHeaderService.getHeaderVisibility
    ) {
      this.manageHeaderService.getHeaderVisibility().subscribe((flag) => {
        this.isHeaderVisible = flag;
        this.cdr.detectChanges();
      });
    }

    //subscribe alerts
    if (this.alertService) {
      this.alertService.get().subscribe((alerts) => {
        if (alerts && alerts.length) {
          this.alertsList = alerts;
        } else {
          this.alertsList = [];
        }
      });
    }
  }

  ngOnDestroy(): void {}

  public navigateTo(screen: string, queryParams?): void {
    switch (screen) {
      case ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.ORGANIZATION_DASHBOARD:
        this.router.navigate([
          `/${ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.ORGANIZATION_DASHBOARD}`,
        ]);
        break;
      case ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.INDIVIDUAL_DASHBOARD:
        this.router.navigate([
          `/${ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.INDIVIDUAL_DASHBOARD}`,
        ]);
        break;
      case ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.EDIT_ORGANIZATION_PROFILE:
        this.router.navigate([
          `/${ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.EDIT_ORGANIZATION_PROFILE}`,
        ]);
        break;
      case ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.EDIT_INDIVIDUAL_PROFILE:
        this.router.navigate([
          `/${ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.EDIT_INDIVIDUAL_PROFILE}`,
        ]);
        break;
      case ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.CHANGE_PASSWORD:
        this.router.navigate([
          `/${ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.CHANGE_PASSWORD}`,
        ]);
        break;
      case ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.LOGOUT:
        this.router.navigate([
          `/${ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.LOGOUT}`,
        ]);
        break;
      case ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.QA_DASHBOARD:
        this.router.navigate([
          `/${ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.QA_DASHBOARD}`,
        ]);
        break;
      case ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.MANAGE_CANDIDATE:
        this.router.navigate(
          [`/${ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.MANAGE_CANDIDATE}`],
          { queryParams: { id: queryParams.id } }
        );
        break;
      case ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.MANAGE_TEAM:
        this.router.navigate([
          `/${ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.MANAGE_TEAM}`,
        ]);
        break;
      case ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.ON_GOING_EVENT_ORGANIZATION:
        this.router.navigate(
          [
            `/${ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.ON_GOING_EVENT_ORGANIZATION}`,
          ],
          { queryParams: { id: queryParams.id } }
        );
        break;
      case ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.ADMIN:
        this.router.navigate([
          `/${ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.ADMIN}`,
        ]);
        break;
      default:
        break;
    }
  }

  public checkForEmptySearch(formObj: FormGroup): boolean {
    if (formObj && formObj.controls) {
      let isFormEmpty = false;
      let keysList = Object.keys(formObj.controls);
      for (let i = 0; i < keysList.length; i++) {
        const control = formObj.get(keysList[i]);
        if (control instanceof FormControl) {
          if (
            control &&
            control.value &&
            Array.isArray(control.value) &&
            control.value.length === 0
          ) {
            isFormEmpty = true;
          } else if (
            control &&
            (control.value === "" ||
              !control.value ||
              (typeof control.value !== "object" &&
                typeof control.value !== "string" &&
                typeof control.value !== "number" &&
                typeof control.value !== "boolean"))
          ) {
            isFormEmpty = true;
          } else {
            isFormEmpty = false;
            break;
          }
        } else if (control instanceof FormGroup) {
          this.checkForEmptySearch;
        }
      }
      return isFormEmpty;
    }
  }

  public onClose = (idx): void => {
    if (idx + 1) {
      this.alertsList.splice(idx, 1);
    }
  };
}
