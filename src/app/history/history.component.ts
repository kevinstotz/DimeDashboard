import { Component, OnInit } from '@angular/core';
import { User } from '../_models/index';
import { UserService } from '../_services/index';

@Component({
    selector: 'app-history',
    moduleId: 'module.id',
    templateUrl:'./history.component.html'
})

export class HistoryComponent implements OnInit {
    currentUser: User;
    users: User[] = [];

    constructor(private userService: UserService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {

    }

}
