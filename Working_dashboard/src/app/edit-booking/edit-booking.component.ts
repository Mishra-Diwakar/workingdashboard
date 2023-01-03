import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../Services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-booking',
  templateUrl: './edit-booking.component.html',
  styleUrls: ['./edit-booking.component.css']
})
export class EditBookingComponent implements OnInit {
editBooking!:FormGroup;
submitted=false;
id!:number;
  constructor(private api:ApiService, private router:Router, private fb:FormBuilder) { 
    if(!this.api.isUserLoggedIn()){this.router.navigate(['']); }

  }

  ngOnInit(): void {
    this.editBooking=this.fb.group({
      name:['',[Validators.required, Validators.pattern("^[a-zA-Z][a-zA-Z\\s]+$")]],
      contact:['',[Validators.required, Validators.pattern("^[6-9]{1}[0-9]{9}$") ]],
      address:['',[Validators.required, Validators.pattern("^[a-zA-Z0-9.+',-_():][a-zA-Z0-9.+',-_():\\s]+$")]],
      bookingDate:['',Validators.required],
      status:['',Validators.required],
      bookingTime:['',Validators.required],
      departureTime:['',Validators.required],
      time:''
    });
    if(this.api.bookingDataForEdit.bookingId==undefined){
      console.log("booking id: "+this.api.bookingDataForEdit.bookingId);
      this.router.navigate(['/manage-booking']);
    }
    
    this.id=this.api.bookingDataForEdit.bookingId;
    this.editBooking.controls['name'].setValue(this.api.bookingDataForEdit.name);
    this.editBooking.controls['contact'].setValue(this.api.bookingDataForEdit.contact);
    this.editBooking.controls['address'].setValue(this.api.bookingDataForEdit.address);
    this.editBooking.controls['bookingDate'].setValue(this.api.bookingDataForEdit.bookingDate);
    this.editBooking.controls['status'].setValue(this.api.bookingDataForEdit.status);
    this.editBooking.controls['bookingTime'].setValue(this.api.bookingDataForEdit.bookingTime);
    this.editBooking.controls['departureTime'].setValue(this.api.bookingDataForEdit.departureTime);

  }
  get f(){ return this.editBooking.controls; }

  submitEditBooking(){
    this.submitted=true;
    if(this.editBooking.valid){
      //for time related operation
      var OpenHour;
      var OpenTime;
      var CloseTime;
      var time;
      var timeSplit = this.editBooking.value.bookingTime.split(':');
      var timeSplitClose = this.editBooking.value.departureTime.split(':');
      var CloseHour = timeSplitClose[0];
      var CloseMinute = timeSplitClose[1];
      var OpenHour = timeSplit[0];
      var OpenMinute = timeSplit[1];
     // var hour = this.booking.value.openingTime;

      console.log(this.editBooking.value);
      if (OpenHour > 12 && OpenHour!=12) {
        OpenTime = OpenHour + ":" + OpenMinute + "PM"
      }
      else {
        OpenTime = OpenHour + ":" + OpenMinute + "AM"
      }
      if(OpenHour==12 && OpenMinute>0){
        OpenTime = OpenHour + ":" + OpenMinute + "PM"
       }


      if (CloseHour > 12 && CloseHour!=12) {
        CloseTime = CloseHour + ":" + CloseMinute + "PM"
      }
      else {
        CloseTime = CloseHour + ":" + CloseMinute + "AM"
      }
      if(CloseHour==12 && CloseMinute>0){
        CloseTime = CloseHour + ":" + CloseMinute + "PM"
        console.log(CloseTime)
      }

      time = OpenTime + " - " + CloseTime;

      this.editBooking.value.time = time;

      console.log("called api from here..");
      this.updateChanges();

    }
    if(this.editBooking.invalid){
      alert("something wrong");
      return;
    }

    
    
  }
  updateChanges(){
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.api.editBooking(this.editBooking.value, this.id).subscribe((res=>{
          if(res=="yes"){
              // Swal.fire('Updated..', '', 'success');
              this.router.navigate(['/manage-booking']);
            }
          if(res!="yes"){
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!'
            })
            return;
          }
        }));
       // Swal.fire('Saved!', '', 'success')
      } else if (result.isDenied) {
        return;
      }
    })
  }

}
