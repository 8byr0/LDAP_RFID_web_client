import { Injectable } from '@angular/core';
import { Group } from './models/group.model';

@Injectable()
export class SelectedUserService {
  
  public selectedUser: Group = undefined
  public lastFetchedRFID: string
  public readNew: boolean = false
  private groupWaitingForRFID: Group;


  private methods: {}

  constructor() { 
    this.methods = new Map()
  }
  
  on(method: string, cbk: Function): any {
    if(undefined == this.methods[method])
    {
      this.methods[method] = cbk
    }
  }

  setWaitingForRFID(selectedUser: Group){
    this.readNew = true
    this.groupWaitingForRFID = selectedUser
  }

  startReadNew(){
    this.methods["readNew"]()
    this.readNew = false;
  }

  registerRFID(code: string){
    this.groupWaitingForRFID.uid=code
    this.readNew = false;
  }
}
