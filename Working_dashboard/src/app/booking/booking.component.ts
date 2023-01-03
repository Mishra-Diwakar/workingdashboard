import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../Services/api.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { timer } from 'rxjs';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
booking!:FormGroup
submitted=false;
date1: Date = new Date('2000-11-12');
currentDate: Date = new Date();
date:boolean=false;
  constructor(private api:ApiService, private router:Router, private fb:FormBuilder, private datePipe: DatePipe) {
      //check user logged in or not
      if(!this.api.isUserLoggedIn()){this.router.navigate(['']); }
  
   }

  ngOnInit(): void {
    this.booking=this.fb.group({
      name:['',[Validators.required, Validators.pattern("^[a-zA-Z][a-zA-Z\\s]+$")]],
      contact:['',[Validators.required, Validators.pattern("^[6-9]{1}[0-9]{9}$") ]],
      address:['',[Validators.required, Validators.pattern("^[a-zA-Z0-9.+',-_():][a-zA-Z0-9.+',-_():\\s]+$")]],
      bookingDate:['',Validators.required],
      status:['',Validators.required],
      bookingTime:['',Validators.required],
      departureTime:['',Validators.required],
      time:''
    });
  }
  
  get f(){ return this.booking.controls; }
  submitBooking(){
    this.submitted=true;
    this.date1=this.booking.value.bookingDate;
    if(this.booking.valid){

      if(new Date(this.date1).getTime() < new Date(this.currentDate).getTime()){
        this.booking.setErrors({ 'invalid': true });
        this.booking.controls['bookingDate'].setErrors({'incorrect': true});
        this.date=false;
        return;
      }

      if(new Date(this.date1).getTime() > new Date(this.currentDate).getTime()){
        this.date=true;
      }

       //for time related operation
       var OpenHour;
       var OpenTime;
       var CloseTime;
       var time;
       var timeSplit = this.booking.value.bookingTime.split(':');
       var timeSplitClose = this.booking.value.departureTime.split(':');
       var CloseHour = timeSplitClose[0];
       var CloseMinute = timeSplitClose[1];
       var OpenHour = timeSplit[0];
       var OpenMinute = timeSplit[1];
      // var hour = this.booking.value.openingTime;
 
       console.log(this.booking.value);
       if (OpenHour > 12 && OpenHour!=12) {
          OpenHour = timeSplit[0];
         // OpenHour = timeSplit[0] - 12;
         OpenTime = OpenHour + ":" + OpenMinute + "PM"
       }
       else {
         OpenTime = OpenHour + ":" + OpenMinute + "AM"
       }

       if(OpenHour==12 && OpenMinute>0){
        OpenTime = OpenHour + ":" + OpenMinute + "PM"
       }

       if (CloseHour > 12 && CloseHour!=12) {
          CloseHour = timeSplitClose[0];
        // CloseHour = timeSplitClose[0] - 12;
         CloseTime = CloseHour + ":" + CloseMinute + "PM"
       }
       else {
         CloseTime = CloseHour + ":" + CloseMinute + "AM"
       }


       //below for testing

       if(CloseHour==12 && CloseMinute>0){
        CloseTime = CloseHour + ":" + CloseMinute + "PM"
        console.log(CloseTime)
      }

       // above code for testing
       time = OpenTime + " - " + CloseTime;
 
       this.booking.value.time = time;

      console.log("send data from here...");

      this.api.booking(this.booking.value).subscribe((res=>{
        if(res=="yes"){
          Swal.fire({
            position: 'top',
            icon: 'success',
            title: 'Your booking has been done',
            showConfirmButton: false,
            timer: 1000
          });
          this.router.navigate(['/dashboard']);
        }
        if(res!="yes"){
          Swal.fire('Not Added', '', 'error');
          
        }
      }));
    }
    if(this.booking.invalid){
      Swal.fire('Invalid form', '', 'error');
      console.log("Form invalid");
    }

  }

}
