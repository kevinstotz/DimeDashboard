import { Component, OnInit } from '@angular/core';
import { FileUploadService } from '../_services/index';
import { FileUpload } from '../_models/index';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {
  private fileToUpload: File = null;
  private fileUpload: FileUpload = new FileUpload();

  constructor(private fileUploadService: FileUploadService) { }

  ngOnInit() {
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
