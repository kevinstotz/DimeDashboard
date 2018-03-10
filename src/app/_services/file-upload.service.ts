import { Injectable } from '@angular/core';
import { Environment } from '../environments/index';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable }   from 'rxjs/Observable';
import { AuthenticationService } from '../_services/authentication.service';
import { GenericResponse} from '../_models/index';

@Injectable()
export class FileUploadService {
  private environment: Environment;
  private httpOptions: object;

  constructor(private authenticationService: AuthenticationService,
    private http: HttpClient) {
        this.httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' })
        };
        this.environment = new Environment();
  }

  postFile(fileUpload) {
      let id = JSON.parse(this.authenticationService.getCurrentUserId());

      if (id && id.userId && id.userId > 0) {
        return this.http.post<GenericResponse>(this.environment.api.UPLOAD_FILE_URL, fileUpload, this.httpOptions);
      }
  }

}