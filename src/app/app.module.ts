import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UserComponent } from './user/user.component';
import { DataProviderService } from './data-provider.service';
import { HttpClientModule } from '@angular/common/http';
import { SelectedUserService } from './selected-user.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsersListComponent,
    UserComponent
  ], 
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [DataProviderService, SelectedUserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
