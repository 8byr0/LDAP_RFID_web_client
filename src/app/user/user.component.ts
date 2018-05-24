import { Component, OnInit, Input } from '@angular/core';
import { Group } from '../models/group.model';
import { SelectedUserService } from '../selected-user.service';
import { DataProviderService } from '../data-provider.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  
  constructor(protected suService: SelectedUserService, private dataProvider: DataProviderService) { }

  ngOnInit() {
    let self = this
    this.suService.on("readNew", function () {
      console.log(self.suService.lastFetchedRFID)
    })
  }


  updateUser() {
    this.dataProvider.saveGroup(this.suService.selectedUser)
  }


  deleteUser() {
    this.dataProvider.deleteGroup(this.suService.selectedUser)
  }


  createUser() {
    this.dataProvider.createGroup(this.suService.selectedUser)
  }
}
