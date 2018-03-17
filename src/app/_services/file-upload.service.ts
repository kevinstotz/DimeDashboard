import { Injectable } from '@angular/core';
import { Environment } from '../environments/index';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Headers } from '@angular/http';
import { Observable }   from 'rxjs/Observable';
import { AuthenticationService } from '../_services/authentication.service';
import { GenericResponse, Document, DocumentType} from '../_models/index';
import { MatOptionModule, MatSelectModule } from '@angular/material';


@Injectable()
export class FileUploadService {
  private environment: Environment;
  private headerOptions: object;

  constructor(private authenticationService: AuthenticationService,
    private http: HttpClient) {
        this.headerOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' })
        };
        this.environment = new Environment();
  }

  postFile(fileUpload, fileType) {
      let id = JSON.parse(this.authenticationService.getCurrentUserId());
      if (id && id.userId && id.userId > 0) {
        return this.http.post<GenericResponse>(this.environment.api.UPLOAD_FILE_URL + fileType + '_' + fileUpload.name + '/' , fileUpload, this.headerOptions);
      }
  }
  getDocumentTypes() {
      let id = JSON.parse(this.authenticationService.getCurrentUserId());

      if (id && id.userId && id.userId > 0) {
        return this.http.get<DocumentType[]>(this.environment.api.DOCUMENT_TYPES_URL, this.headerOptions);
      }
  }
  deleteDocument(documentId) {
      let id = JSON.parse(this.authenticationService.getCurrentUserId());

      if (id && id.userId && id.userId > 0) {
        return this.http.delete<GenericResponse>(this.environment.api.DOCUMENT_DELETE_URL + documentId, this.headerOptions);
      }
  }
  getDocuments() {
      let id = JSON.parse(this.authenticationService.getCurrentUserId());

      if (id && id.userId && id.userId > 0) {
        return this.http.get<Document[]>(this.environment.api.GET_DOCUMENTS_URL, this.headerOptions);
      }
  }
}
