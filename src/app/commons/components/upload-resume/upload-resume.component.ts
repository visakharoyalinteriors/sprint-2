import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-upload-resume",
  templateUrl: "./upload-resume.component.html",
  styleUrls: ["./upload-resume.component.scss"],
})
export class UploadResumeComponent implements OnInit {
  public resumePath;
  private resumeURL: any;
  public message: string;

  @Output() onResumeChange = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  public onRemove = (): void => {
    this.resumeURL = null;
    if (this.onResumeChange) {
      this.onResumeChange.emit({ image: this.resumeURL });
    }
  };

  public preview = (files): void => {
    if (files.length === 0) return;

    var mimeType = files[0].type;
    var reader = new FileReader();
    this.resumePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.resumeURL = reader.result;
      if (this.onResumeChange) {
        this.onResumeChange.emit({ file: this.resumeURL });
      }
    };
  };
}
