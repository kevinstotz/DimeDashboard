import { Component, OnInit, ElementRef, ViewChild  } from '@angular/core';
import { FileUploadService, AlertService } from '../_services/index';
import { Document, DocumentType } from '../_models/index';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, FormControl, FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { isNumeric } from 'rxjs/util/isNumeric';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { WebcamImage } from 'ngx-webcam';


@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  @ViewChild("singleFile") fileInputVariable: any;
  @ViewChild("file_path_display") filePathDisplayDiv: any;

  private documents: Document[] = new Array();
  private documentForm: FormGroup;
  private documentTypes: DocumentType[] = new Array();
  private fileToUpload: File = null;
  private userProfileForm: FormGroup;
  private buttonDisabled: boolean = false;
  private isLoading: boolean = false;
  private document: Document = new Document();

  constructor(private fileUploadService: FileUploadService,
              private formBuilder: FormBuilder,
              private alertService: AlertService) {

    this.getDocuments();
    this.fileUploadService.getDocumentTypes().subscribe(data => {
        this.documentTypes = data;
      }, error => {
        console.log(error);
      });
  }

  ngOnInit() {
      this.documentForm = this.formBuilder.group({
          fileType : [{value: "", disabled: false}, [ Validators.required ]],
          fileObject : [{value: null, disabled: false}, [ Validators.required ]],
      });
  }

  getDocuments() {
    this.fileUploadService.getDocuments().subscribe( data => {
        this.documents = data;
      }, error => {
        console.log(error);
      });
  }
  documentUpload(documentForm) {
    if (this.fileInputVariable.nativeElement.files.length <= 0 ) {
      this.alertService.info("Select a Document");
      return;
    }
    this.alertService.info("");
    if ( this.documentForm.controls.fileType.value == 0) {
      this.alertService.info("Select a Document Type");
      return;
    }
    this.alertService.clear();
    this.buttonDisabled = true;
    this.uploadFileToActivity(this.fileToUpload, documentForm.controls.fileType.value);
  }

  documentDelete(documentId) {
    this.fileUploadService.deleteDocument(documentId).subscribe(data => {
        this.getDocuments();
      }, error => {
        console.log(error);
      });
  }

  handleFileSelect(files: FileList) {
      this.fileToUpload = files.item(0);
      this.alertService.clear();
      return;
  }
  handleDocumentTypeSelect(files: FileList) {
      this.alertService.clear();
      return;
  }

  uploadFileToActivity(fileToUpload, fileType) {

    this.fileUploadService.postFile(fileToUpload, fileType).subscribe(data => {
        this.filePathDisplayDiv.nativeElement.innerHTML ="";
        this.documentForm.controls['fileType'].setValue(0, {onlySelf: true});
        this.alertService.clear();
        this.buttonDisabled = false;
        this.getDocuments();
      }, error => {
        this.buttonDisabled = false;
        console.log(error);
      });
  }
  public showWebcam = true;

// latest snapshot
public webcamImage: WebcamImage = null;

// webcam snapshot trigger
private trigger: Subject<void> = new Subject<void>();

public triggerSnapshot(): void {
  this.trigger.next();
}

public toggleWebcam(): void {
  this.showWebcam = !this.showWebcam;
}

public handleImage(webcamImage: WebcamImage): void {
  console.info('received webcam image', webcamImage);
  this.webcamImage = webcamImage;
}

public get triggerObservable(): Observable<void> {
  return this.trigger.asObservable();
}
}
