import { Injectable } from '@angular/core';
import { Environment } from '../environments/index';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable }   from 'rxjs/Observable';
import { User } from '../_models/index';
import { AuthenticationService } from '../_services/authentication.service';
import 'rxjs/add/operator/map';
import { GenericResponse, Profile } from '../_models/index';


@Injectable()
export class UserService {
    private environment: Environment;
    private httpOptions: object;

    constructor(private authenticationService: AuthenticationService,
      private http: HttpClient) {
        this.httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
        this.environment = new Environment();
    }

    getUserProfile() {
        let id = JSON.parse(this.authenticationService.getCurrentUserId());

        if (id && id.userId && id.userId > 0) {
          return this.http.get<Profile[]>(this.environment.api.USER_INFO_URL + id.userId  + '/', this.httpOptions);
        }
    }

    updateUserProfile(user: User) {
        return this.http.put('/api/users/' + user, user);
    }

}
