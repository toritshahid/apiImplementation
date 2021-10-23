import { Component, Input, OnInit } from '@angular/core';
import { GetLocationService } from './_services/get-location.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'apicheck';
  @Input() employeeDetails = {
    "SnUserType" : 3,
    "SEmailId" : "pmsrdx1@gmail.com",
    "SPassword" : "Pmsrdx@123#",
    "SFirstName": "Sanjay",
    "SLastName": "Rathod",
    "SDob": "18/12/1993",
    "SContactNo": "8866600819",
    "SInterface":"http://api.concoursedeals.com"
}
  Location: any=[];
  jobResults: any=[];
  userDetails: any=[];
  constructor(
    public locationApi: GetLocationService
  ) { }
  ngOnInit(): void {
    this.getLocation();
    this.getJobSearchResult();
    this.addUser();
  }
  getLocation() {
    return this.locationApi.getLocation().subscribe((data: {}) => {
      this.Location = data;
      console.log(this.Location)
    })
  }
  getJobSearchResult(){
    return this.locationApi.getJobResults("pune", "android developer").subscribe((data: {}) => {
      this.jobResults = data;

      console.log(this.jobResults);

    })
  }
  addUser() {
    this.locationApi.createUser(this.employeeDetails).subscribe((data: {}) => {
      this.userDetails=data;
      alert("success")
      console.log(this.userDetails)
    })
  }
}
