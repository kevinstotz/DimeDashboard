import { Component, OnInit } from '@angular/core';
import { FileUploadService, AlertService } from '../_services/index';
import { Document, DocumentType } from '../_models/index';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, FormControl, FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { isNumeric } from 'rxjs/util/isNumeric';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  private documents: Document[] = new Array();
  private documentForm: FormGroup;
  private documentTypes: DocumentType[] = new Array();
  private fileToUpload: File = null;
  private userProfileForm: FormGroup;
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
          fileType : [{value: "", disabled: false}, []],
          fileObject : [{value: null, disabled: false}, []],
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
    if ( this.documentForm.controls.fileObject == null) {
      this.alertService.error("Select a Document");
      return;
    }
    if ( !isNumeric(this.documentForm.controls.fileType.value)) {
      this.alertService.error("Select a Document Type");
      return;
    }

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
      return;
  }

  uploadFileToActivity(fileToUpload, fileType) {
    this.fileUploadService.postFile(fileToUpload, fileType).subscribe(data => {
      this.documentForm.controls.fileObject = null;
      this.documentForm.controls.fileType = null;
        this.getDocuments();
      }, error => {
        console.log(error);
      });
  }
}
