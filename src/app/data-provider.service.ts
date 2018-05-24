import { Injectable, group } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Group } from './models/group.model';
import { of } from 'rxjs/observable/of';
import { RfidStatus } from './models/rfid-status.model';
import { SelectedUserService } from './selected-user.service';

let serverAddress: string = "http://10.3.183.10:5000"
// let serverAddress: string = "http://192.168.1.111:5000"

@Injectable()
export class DataProviderService {
  private groups: Group[] = []

  constructor(private http: HttpClient, private selectedUserService: SelectedUserService) {
    this.http.get(serverAddress + "/persons").subscribe(res => {
      console.log("fetched groups", res)
      for (let personData in res["results"]) {
        // console.log(res["results"][personData].attributes, "attributes")
        let personPath: string = res["results"][personData].dn

        // console.log(personPath)
        this.getGroupFromPersonDescription(personPath)

        let currentGroup: Group = new Group({
          givenName: (res["results"][personData].attributes["givenName"] != undefined) ? res["results"][personData].attributes["givenName"][0] : "",
          name: (res["results"][personData].attributes["givenName"] != undefined) ? res["results"][personData].attributes["givenName"][0] : "",
          city: (res["results"][personData].attributes["l"] != undefined) ? res["results"][personData].attributes["l"][0] : "",
          thumbnail: "https://placeimg.com/15/15/any",
          zipCode: (res["results"][personData].attributes["postalCode"] != undefined) ? res["results"][personData].attributes["postalCode"][0] : "",
          uid: (res["results"][personData].attributes["uid"] != undefined) ? res["results"][personData].attributes["uid"][0] : "",
          phoneNumber: (res["results"][personData].attributes["homePhone"] != undefined) ? res["results"][personData].attributes["homePhone"][0] : "",
          mobile: (res["results"][personData].attributes["mobile"] != undefined) ? res["results"][personData].attributes["mobile"][0] : "",
          mail: (res["results"][personData].attributes["mail"] != undefined) ? res["results"][personData].attributes["mail"][0] : "",
          sn: (res["results"][personData].attributes["sn"] != undefined) ? res["results"][personData].attributes["sn"][0] : "",
          cn: (res["results"][personData].attributes["cn"] != undefined) ? res["results"][personData].attributes["cn"][0] : "",
          fromDB: true
        })

        this.groups.push(currentGroup)
      }

      this.groups.sort((a, b) => a.name > b.name ? 1 : -1);
    })
  }

  public checkRFID(): Observable<any> {
    let returnedStatus: RfidStatus

    return this.http.get(serverAddress + "/check_rfid")
  }



  public getGroups(): Observable<Group[]> {
    return of(this.groups)
  }

  public getGroupFromPersonDescription(description: string): string {
    let resData
    let re = /\s*,\s*/;
    let nameList = description.split(re);


    for (let current of nameList) {


      if (current.includes("cn=")) {
        let cn = current.replace('cn=', '');
      }

      if (current.includes("ou=")) {
        let ou = current.replace('ou=', ''); // group
      }

    }

    return "name"
  }

  getUser(rfid_code: string): Group {
    console.log("Fetching user whose id is ", rfid_code)
    let found = this.groups.find(function (element) {
      return element.uid == rfid_code;
    });
    return found
  }

  saveGroup(group: Group) {

    let toSend = {
      "ou": ["G2", "R3"],
      "mobile": [group.mobile],
      "homePhone": group.phoneNumber,
      "objectClass": ['inetOrgPerson', "top"],
      "postalCode": [group.zipCode],
      "sn": [group.sn],
      "l": [group.city],
      "givenName": [group.name],
      "uid": [group.uid],
      "cn": [group.cn],
      "mail": [group.mail]
    }

    console.log(toSend)

    let headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');


    this.http.put(serverAddress + "/person", toSend, { headers: headers }).subscribe(res => {
      console.log(res)
    });
  }

  createGroup(group: Group) {

    let toSend = {
      "ou": ["G2", "R3"],
      "mobile": [group.mobile],
      "homePhone": group.phoneNumber,
      "objectClass": ['inetOrgPerson', "top"],
      "postalCode": [group.zipCode],
      "sn": [group.sn],
      "l": [group.city],
      "givenName": [group.name],
      "uid": [group.uid],
      "cn": [group.cn],
      "mail": [group.mail]
    }

    console.log(toSend)

    let headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');


    this.http.post(serverAddress + "/person", toSend, { headers: headers }).subscribe(res => {
      this.groups.push(group)
      group.fromDB = true
    });
  }

  deleteGroup(group: Group) {

    console.log("DELETING")
    const params = new HttpParams().set('cn', group.cn);

    return this.http.delete(serverAddress + "/person", { params })
      .subscribe(
        result => {
          let index = this.groups.indexOf(group, 0);
          if (index > -1) {
            this.groups.splice(index, 1);
          }
          this.selectedUserService.selectedUser = undefined
        }
      );

  }

}
