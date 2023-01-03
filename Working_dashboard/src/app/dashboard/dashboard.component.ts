import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../Services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
Booking:any=[];
totalBooking:number=0;
totalStaff:number=0;
runningStaff:number=0;
todayBooking:any=0;

  constructor(private api: ApiService, private router:Router, public datepipe: DatePipe) {
    var myDate = new Date();
    var today=this.datepipe.transform(myDate,'yyyy-MM-dd');
    //when user logged out
    if(!this.api.isUserLoggedIn()){
      this.router.navigate(['']);
    }
    this.api.bookinList().subscribe((res=>{
      this.Booking=res;
      var total = Object.keys(res);
      this.totalBooking=total.length;
      for(var i=0;i<this.totalBooking;i++){
        if(this.Booking[i].bookingDate==today){
          this.todayBooking++;
        }
      }
    }));
    this.api.totalStaff().subscribe((res=>{
      var total=JSON.stringify(res);
      this.totalStaff=parseInt(total);
    }));
    this.api.totalActiveStaff().subscribe((res=>{
      var total = JSON.stringify(res)
      this.runningStaff=parseInt(total);
    }));
    
  }

  ngOnInit(): void {
    
  }

}
