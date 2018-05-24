import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataProviderService } from '../data-provider.service';
import { Group } from '../models/group.model';
import { SelectedUserService } from '../selected-user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  groups: Group[]

  constructor(private dataProvider: DataProviderService, protected suService: SelectedUserService) {
    this.dataProvider.getGroups().subscribe(found => this.groups = found)
  }

  ngOnInit() {
  }

  updateSelected(group: Group) {
      this.suService.selectedUser = group
  }

  createNewUser(){
    this.suService.selectedUser = new Group({ givenName: "",
    name: "",
    thumbnail: "https://placeimg.com/15/15/any",
    zipCode: "",
    uid: "",
    phoneNumber: "",
    mobile: "",
    mail: "",
    city: "",
    sn:"",
    cn:"",
    fromDB: false
})
  }
}
