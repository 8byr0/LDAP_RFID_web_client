import { Component, OnInit } from '@angular/core';
import { DataProviderService } from './data-provider.service';
import { RfidStatus } from './models/rfid-status.model';
import { SelectedUserService } from './selected-user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  private refreshIntervalId

  public constructor(private dataProvider: DataProviderService, private selectedUserService: SelectedUserService) {

  }

  ngOnInit(): void {
    this.startFetchingRFID();
  }

  startFetchingRFID() {
    this.refreshIntervalId = setInterval(() => {
      this.dataProvider.checkRFID().subscribe((res) => {

        if (res.status == 1) {
          console.log(res)
          if (this.selectedUserService.readNew) {
            this.selectedUserService.lastFetchedRFID = res.rfid_code
            this.selectedUserService.registerRFID(res.rfid_code)
            console.log("user notified")

          } else {
            if (this.selectedUserService.lastFetchedRFID != res.rfid_code) {
              this.handleResponse(res.rfid_code)
            }
          }
        }

      });
    }, 1000);
  }

  stopFetchingRFID() {
    clearInterval(this.refreshIntervalId);
  }

  handleResponse(rfid_code: string) {
    console.log(rfid_code)
    this.selectedUserService.selectedUser = this.dataProvider.getUser(rfid_code);
  }
}

