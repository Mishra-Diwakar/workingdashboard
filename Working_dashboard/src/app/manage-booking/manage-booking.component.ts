import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../Services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-booking',
  templateUrl: './manage-booking.component.html',
  styleUrls: ['./manage-booking.component.css']
})
export class ManageBookingComponent implements OnInit {
  bookingList: any = [];
  totalBooking!: number;
  totalLength: any;
  searchText: any;
  page: number = 1;
  perPageData: number = 5;
  items: any;
  constructor(private api: ApiService, private router: Router) {
    //check user logged in or not
    if (!this.api.isUserLoggedIn()) { this.router.navigate(['']); }
    // if(this.api.getType()!="admin"){ this.router.navigate(["/dashboard"]); }
  }

  ngOnInit(): void {
    this.getAllBookingList();
  }
  editBooking(data: any) {
    this.api.bookingDataForEdit = data;
    console.log(data)
    this.router.navigate(['/edit-booking'])
  }

  getAllBookingList() {
    this.api.bookinList().subscribe((res => {
      this.bookingList = res;
      var total = Object.keys(res);
      this.totalBooking = total.length;
      this.totalLength = this.totalBooking;
      console.log(res);
    }));
  }

  deleteBooking(id: number) {


    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to recover this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.deleteBooking(id).subscribe((res => {
          if (res == "yes") {
            this.getAllBookingList();
          }
          if (res != "yes") {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',

            })
          }
        }));
      }
    })

  }
  submitItems(items: any) {
    if (items == undefined) {
      return;
    }
    console.log("items value: " + items);
    this.perPageData = items;
  }
  downloadBooking(data: any) {
    // console.log(JSON.stringify(data));
    // this.api.downloadBooking(data).subscribe(res=>{
    //   console.log(res);
    // });
    this.api.bookingDataForEdit = data;
    this.router.navigate(['/generatePdf']);

  }
}
