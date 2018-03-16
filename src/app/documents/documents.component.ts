import { Component, OnInit } from '@angular/core';
import { FileUploadService } from '../_services/index';
import { FileUpload, Document, DocumentType } from '../_models/index';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, FormControl, FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {
  private documents: Document[] = new Array();
  private documentForm: FormGroup;
  private documentTypes: DocumentType[] = new Array();
  private fileToUpload: File = null;
  private fileUpload: FileUpload = new FileUpload();
  private userProfileForm: FormGroup;
  private isLoading: boolean = false;
  private document: Document = new Document();

  constructor(private fileUploadService: FileUploadService,
              private formBuilder: FormBuilder) {

    this.fileUploadService.getDocuments().subscribe( data => {
        this.documents = data;
        console.log(this.documents);
      }, error => {
        console.log(error);
      });

    this.fileUploadService.getDocumentTypes().subscribe(data => {
        this.documentTypes = data;
        console.log(this.documentTypes);
      }, error => {
        console.log(error);
      });
  }

  ngOnInit() {
      this.documentForm = this.formBuilder.group({
          fileType : [{value: null, disabled: false}, []],
          fileObject : [{value: null, disabled: false}, []],
      });
  }

  documentUpload(documentForm) {

  }

  handleFileInput(files: FileList) {
      this.fileToUpload = files.item(0);
      if (this.fileToUpload.size > 10) {
        this.uploadFileToActivity(this.fileToUpload);
      }
      return;
  }

  uploadFileToActivity(fileToUpload) {
    this.fileUploadService.postFile(fileToUpload).subscribe(data => {
        console.log(data);
      }, error => {
        console.log(error);
      });
  }
}
