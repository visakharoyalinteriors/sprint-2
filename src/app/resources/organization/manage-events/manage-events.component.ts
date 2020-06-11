import { Component, OnInit, ViewChild } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
  FormGroupDirective,
  AbstractControl,
} from "@angular/forms";
import ObjectUtil from "../../../commons/utils/object-utils";
import { ManageEventsService } from "./manage-events/manage-events.service";
import { Alerts, ValueDescription } from "../../../commons/typings/typings";
import FONT_AWESOME_ICONS_CONSTANTS from "../../../commons/constants/font-awesome-icons";
import { AppComponent } from "src/app/app.component";
import { Router } from "@angular/router";
import { ROUTE_URL_PATH_CONSTANTS } from "../../../commons/constants/route-url-path.constants";
import { Subscription } from "rxjs";
import { ManageSkillsService } from "../../admin/manage-skills/manage-skills/manage-skills.service";

interface SkillRound {
  skill: ValueDescription;
  numberOfRounds: number;
}

@Component({
  selector: "app-manage-events",
  templateUrl: "./manage-events.component.html",
  styleUrls: ["./manage-events.component.scss"],
})
export class ManageEventsComponent extends AppComponent implements OnInit {
  resetField: boolean;
  alerts: Alerts[];
  ROUTE_URL_PATH_CONSTANTS;
  eventsList: any[];
  private _subscriptions = new Subscription();
  formGroupObject: FormGroup;
  public displayTextObj: object;
  skillsList: SkillRound[];
  skillOptionsList: ValueDescription[];
  filteredSkillOptionsList: ValueDescription[];
  fontIcon = FONT_AWESOME_ICONS_CONSTANTS;
  mininumEventDate: string;
  renderSkill: ValueDescription;

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
  constructor(
    private fb: FormBuilder,
    public objectUtil: ObjectUtil,
    public manageEventsService: ManageEventsService,
    public router: Router,
    private manageSkillsService: ManageSkillsService
  ) {
    super();
  }

  ngOnInit() {
    this.mininumEventDate = this.stringDateFormat();
    this.ROUTE_URL_PATH_CONSTANTS = ROUTE_URL_PATH_CONSTANTS;
    this.eventsList = [];
    this.displayTextObj = {
      name: "Name",
      eventDate: "Date",
      eventTime: "Time",
      skill: "Skill",
      numberOfRounds: "Number of rounds",
    };
    this.resetField = false;
    this.getSkillOptions();
    this.initializeForm();
    this.getEventsList();
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  private initializeForm = (formData?) => {
    if (formData) {
      this.formGroupObject = this.fb.group({
        id: new FormControl(formData && formData.id ? formData.id : null),
        createdBy: new FormControl(
          formData && formData.createdBy ? formData.createdBy : ""
        ),
        creationDate: new FormControl(
          formData && formData.creationDate ? formData.creationDate : ""
        ),
        name: new FormControl(formData && formData.name ? formData.name : "", [
          Validators.required,
          Validators.minLength(3),
        ]),
        eventDate: new FormControl(
          formData && formData.eventDate ? formData.eventDate : "",
          [Validators.required]
        ),
        eventTime: new FormControl(
          formData && formData.eventTime ? formData.eventTime : "",
          [Validators.required]
        ),
        skill: new FormGroup({
          value: new FormControl("", []),
          description: new FormControl("", []),
        }),
        numberOfRounds: new FormControl("", []),
      });
      this.skillsList =
        formData && formData.skillsList && formData.skillsList.length > 0
          ? formData.skillsList
          : [];
    } else {
      this.formGroupObject = this.fb.group({
        id: new FormControl(null),
        createdBy: new FormControl(""),
        creationDate: new FormControl(""),
        name: new FormControl("", [
          Validators.required,
          Validators.minLength(3),
        ]),
        eventDate: new FormControl("", [Validators.required]),
        eventTime: new FormControl("", [Validators.required]),
        skill: new FormGroup({
          value: new FormControl("", [Validators.required]),
          description: new FormControl("", [
            Validators.required,
            Validators.minLength(2),
          ]),
        }),
        numberOfRounds: new FormControl("", [Validators.required]),
      });
      this.skillsList = [];
    }
  };

  onSave = () => {
    this.alerts = [];
    if (
      this.formGroupObject.controls.skill["controls"].value.value &&
      this.formGroupObject.controls.numberOfRounds.value
    ) {
      this.addNewSkill();
    }

    let requestBody = {
      id:
        this.formGroupObject &&
        this.formGroupObject.value &&
        this.formGroupObject.value.id
          ? this.formGroupObject.value.id
          : null,
      name: this.formGroupObject.value.name,
      eventDate: this.formGroupObject.value.eventDate,
      creationDate: this.formGroupObject.value.eventDate,
      eventTime: this.formGroupObject.value.eventTime,
      createdBy: "",
      skillsList: [...this.skillsList],
    };
    // this.eventsList["push"](requestBody);
    console.log("onSubmit of eventsList ", this.eventsList);
    if (
      requestBody &&
      requestBody.id !== null &&
      requestBody.id !== undefined
    ) {
      this.updateEvent(requestBody);
    } else {
      this.createEvent(requestBody);
    }
    this.onReset();
  };

  onReset = () => {
    this.resetField = true;
    this.initializeForm();
    this.formGroupDirective.resetForm();
    // setTimeout(() => this.formGroupDirective.resetForm(), 0);
    setTimeout(() => {
      this.resetField = false;
    }, 500);
  };

  private updateEvent = (requestBody) => {
    this._subscriptions.add(
      this.manageEventsService.updateEvent(requestBody).subscribe(
        (response) => {
          console.log("update successfull");
          this.getEventsList();
          this.alerts = [
            { code: "SUCCESS", systemMessage: "Updated sucessfully" },
          ];
        },
        (errors) => {
          console.log(errors);
        }
      )
    );
  };

  private createEvent = (requestBody) => {
    this._subscriptions.add(
      this.manageEventsService.createEvent(requestBody).subscribe(
        (response) => {
          console.log(response);
          this.getEventsList();
          this.alerts = [
            { code: "SUCCESS", systemMessage: "Event created successfully" },
          ];
        },
        (errors) => {
          console.log(errors);
          if (errors && errors.error && errors.error.messages) {
          }
        }
      )
    );
  };

  checkForError(formObj, property) {
    return this.objectUtil.checkForFormErrors(formObj, property);
  }

  public onTimeChange = (event): void => {
    if (event) {
      this.formGroupObject["controls"]["eventTime"].setValue(event);
    } else {
      this.formGroupObject["controls"]["eventTime"].setValue("");
    }
  };

  addNewSkill = () => {
    let eachSkill = {
      skill: {
        value: this.formGroupObject.controls.skill["controls"].value.value,
        description: this.formGroupObject.controls.skill["controls"].description
          .value,
      },
      numberOfRounds: this.formGroupObject.controls.numberOfRounds.value,
    };
    this.skillsList.push(eachSkill);
    // this.handleMandatorySkill();
    this.clearSkillFields();
  };

  private clearSkillFields = () => {
    this.formGroupObject.controls.skill.setValue({
      value: "",
      description: "",
    });
    this.formGroupObject.controls.skill.markAsUntouched();
    this.formGroupObject.controls.skill.markAsPristine();
    this.formGroupObject.controls.numberOfRounds.setValue("");
    this.formGroupObject.controls.numberOfRounds.markAsPristine();
    this.formGroupObject.controls.numberOfRounds.markAsUntouched();
    this.resetField = true;
    setTimeout(() => {
      this.resetField = false;
    }, 500);
  };

  public removeSkill = (idx) => {
    this.skillsList.splice(idx, 1);
    console.log("skills 2", this.skillsList);
    // this.cdr.detectChanges();
  };

  public onSkillEdit = (skillObj): void => {
    this.formGroupObject.controls.skill.setValue({
      value: skillObj.skill.value,
      description: skillObj.skill.description,
    });
    this.renderSkill = { ...skillObj.skill };
    this.formGroupObject.controls.numberOfRounds.setValue(
      skillObj.numberOfRounds
    );
  };

  public onEditOfEvent = (event) => {
    this._subscriptions.add(
      this.manageEventsService.findEvent(event.id).subscribe((response) => {
        this.initializeForm({ ...response });
      })
    );
  };

  public onDeleteOfEvent = (event) => {
    if (event && event.id !== null && event.id !== undefined) {
      this._subscriptions.add(
        this.manageEventsService.deleteEvent(event.id).subscribe(
          (response) => {
            this.getEventsList();
          },
          (errors) => {
            console.log(errors);
          }
        )
      );
    }
  };

  public validateSkillSubmit = () => {
    if (
      this.formGroupObject.controls.skill["controls"].value.value &&
      this.formGroupObject.controls.numberOfRounds.value
    ) {
      return true;
    } else if (
      this.formGroupObject.controls.skill["controls"].value.value === "" &&
      this.formGroupObject.controls.numberOfRounds.value === ""
    ) {
      return false;
    }
  };

  private getEventsList = () => {
    this._subscriptions.add(
      this.manageEventsService.getEvents().subscribe(
        (response) => {
          this.eventsList = response;
          console.log("events", this.eventsList);
        },
        (errors) => {
          console.log("errors", errors);
        }
      )
    );
  };

  public prepareSkillsForDisplay = (event, isTooltip = false) => {
    let skillList = [];
    if (event && event.skillsList && event.skillsList.length) {
      event.skillsList.map((item) => skillList.push(item.skillName));
    }
    let displayText = skillList.join(", ");
    if (displayText && displayText.length > 20) {
      return isTooltip
        ? displayText
        : (displayText = `${displayText.substr(0, 20)} ...`);
    } else {
      return displayText;
    }
  };

  public navigateToScreen = (screen, event?) => {
    if (screen && event) {
      let queryParam = { id: event.id };
      this.navigateTo(screen, queryParam);
    } else if (screen) {
      this.navigateTo(screen);
    }
  };

  private stringDateFormat = (givenDate = null) => {
    let newDate;
    if (givenDate) {
      newDate = new Date(givenDate);
    } else {
      newDate = new Date();
    }

    let year = newDate.getFullYear();
    let month =
      parseInt(newDate.getMonth()) + 1 < 10
        ? "0" + (parseInt(newDate.getMonth()) + 1)
        : parseInt(newDate.getMonth()) + 1;
    let date =
      newDate.getDate() < 10 ? "0" + newDate.getDate() : newDate.getDate();

    return year + "-" + month + "-" + date;
  };

  public onSkillSelect = (data) => {
    if (data) {
      let temp = { ...data };
      this.formGroupObject.controls.skill.setValue({
        value: temp.value,
        description: temp.description,
      });
    }
  };

  public isSkillRequired = (): boolean => {
    let validators = this.formGroupObject.controls.skill[
      "controls"
    ].description.validator({} as AbstractControl);
    return validators && validators.required ? true : false;
  };

  private getSkillOptions = () => {
    this._subscriptions.add(
      this.manageSkillsService.getSkills().subscribe(
        (response) => {
          this.skillOptionsList = [...response];
          this.filteredSkillOptionsList = [];
        },
        (errors) => {
          if (errors) {
            console.log(errors);
          }
        }
      )
    );
  };

  public onSkillOptionSelect = (skill: ValueDescription): void => {
    this.formGroupObject.controls.skill.setValue({
      value: skill.value,
      description: skill.description,
    });
    this.filteredSkillOptionsList = [];
  };

  public onSkillChange = (): void => {
    if (
      this.formGroupObject.controls.skill["controls"].description.value ||
      this.formGroupObject.controls.numberOfRounds.value ||
      this.skillsList.length === 0
    ) {
      this.formGroupObject.controls.skill[
        "controls"
      ].description.setValidators([
        Validators.required,
        Validators.minLength(2),
      ]);
      this.formGroupObject.controls.numberOfRounds.setValidators([
        Validators.required,
      ]);
    } else {
      this.formGroupObject.controls.skill["controls"].description.setValidators(
        []
      );
      this.formGroupObject.controls.skill["controls"].description.setErrors(
        null
      );
      this.formGroupObject.controls.numberOfRounds.setValidators([]);
      this.formGroupObject.controls.numberOfRounds.setErrors(null);
    }
    if (
      this.formGroupObject.controls.skill["controls"].description.value &&
      this.formGroupObject.controls.skill["controls"].description.value
        .length &&
      this.formGroupObject.controls.skill["controls"].description.value.length >
        2
    ) {
      this.filteredSkillOptionsList = this.skillOptionsList.filter(
        (skill) =>
          skill.description
            .toLowerCase()
            .indexOf(
              this.formGroupObject.controls.skill[
                "controls"
              ].description.value.toLowerCase()
            ) !== -1
      );
    } else {
      this.filteredSkillOptionsList = [];
    }
  };

  public onChangeOfRounds = (event) => {
    if (event) {
      this.formGroupObject["controls"]["numberOfRounds"].setValue(event);
    } else {
      this.formGroupObject["controls"]["numberOfRounds"].setValue("");
    }

    if (
      this.formGroupObject.controls.numberOfRounds.value ||
      this.formGroupObject.controls.skill["controls"].description.value ||
      this.skillsList.length === 0
    ) {
      this.formGroupObject.controls.skill[
        "controls"
      ].description.setValidators([
        Validators.required,
        Validators.minLength(2),
      ]);
      this.formGroupObject.controls.numberOfRounds.setValidators([
        Validators.required,
      ]);
    } else {
      this.formGroupObject.controls.skill["controls"].description.setValidators(
        []
      );
      this.formGroupObject.controls.skill["controls"].description.setErrors(
        null
      );
      this.formGroupObject.controls.numberOfRounds.setValidators([]);
      this.formGroupObject.controls.numberOfRounds.setErrors(null);
    }
  };
}
