import { getLocaleTimeFormat } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { observable } from 'rxjs';
import { ApiService } from '../Services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-store',
  templateUrl: './add-store.component.html',
  styleUrls: ['./add-store.component.css']
})
export class AddStoreComponent implements OnInit {
  addStore!: FormGroup;
  imageDetails!: any[];
  Submitted = false;
  selectedFile!: File;
  imageSrc!:string;
  status:number | undefined;
  constructor(private api: ApiService, private router: Router, private fb: FormBuilder, private httpClient: HttpClient) {
    //when user logged out
    if (!this.api.isUserLoggedIn()) {
      this.router.navigate(['']);
    }
    if(this.api.getType()!="admin"){
      this.router.navigate(["/dashboard"]);
    }
    this.status=0;
  }

  ngOnInit(): void {
    this.addStore = this.fb.group({
      storename: ['', [Validators.required, Validators.pattern("^[a-zA-Z][a-zA-Z\\s]+$")]],
      name: ['', [Validators.required, Validators.pattern("^[a-zA-Z][a-zA-Z\\s]+$")]],
      email: ['', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z.-]+\.[a-z]{2,4}$")]],
      contact: ['', [Validators.required, Validators.pattern("^[6-9]{1}[0-9]{9}$")]],
      address: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9.+',-_():][a-zA-Z0-9.+',-_():\\s]+$")]],
      openDayFrom: ['', Validators.required],
      closeDayTo: ['', Validators.required],
      openingTime: ['', Validators.required],
      closingTime: ['', Validators.required],
      pic: ['', Validators.required],
      time: ''
    });
  



  }
  addStoreFormSubmit() {
    this.Submitted = true;
    if (this.addStore.valid) {

      //for time related operation
      var OpenHour;


      var OpenTime;
      var CloseTime;
      var time;
      var timeSplit = this.addStore.value.openingTime.split(':');
      var timeSplitClose = this.addStore.value.closingTime.split(':');
      var CloseHour = timeSplitClose[0];
      var CloseMinute = timeSplitClose[1];
      var OpenHour = timeSplit[0];
      var OpenMinute = timeSplit[1];
      var hour = this.addStore.value.openingTime;

      console.log(this.addStore.value);
      if (OpenHour > 12) {
        OpenHour = timeSplit[0] - 12;
        OpenTime = OpenHour + ":" + OpenMinute + "PM"
      }
      else {
        OpenTime = OpenHour + ":" + OpenMinute + "AM"
      }


      if (CloseHour > 12) {
        CloseHour = timeSplitClose[0] - 12;
        CloseTime = CloseHour + ":" + CloseMinute + "PM"
      }
      else {
        CloseTime = CloseHour + ":" + CloseMinute + "AM"
      }
      time = this.addStore.value.openDayFrom + " - " + this.addStore.value.closeDayTo + " : " + OpenTime + " - " + CloseTime;

      this.addStore.value.time = time;
      const uploadImageData = new FormData();

      uploadImageData.append('storename', this.addStore.value.storename);
      uploadImageData.append('name', this.addStore.value.name);
      uploadImageData.append('email', this.addStore.value.email);
      uploadImageData.append('contact', this.addStore.value.contact);
      uploadImageData.append('address', this.addStore.value.address);
      uploadImageData.append('time', this.addStore.value.time);
      uploadImageData.append('openDayFrom',this.addStore.value.openDayFrom);
      uploadImageData.append('openingTime',this.addStore.value.openingTime);
      uploadImageData.append("closeDayTo",this.addStore.value.closeDayTo);
      uploadImageData.append("closingTime",this.addStore.value.closingTime);
      uploadImageData.append('imageFile', this.selectedFile);

      console.log(this.addStore.value);
      this.api.addStoreData(uploadImageData).subscribe((res)=>{
        console.log("value of res: "+res);
        if(res=="yes"){
          console.log("value of res: "+res);
  
         this.successMethod();
          this.router.navigate(['manage-store']);

        }
        if(res==""){
          this.responsemethod();
          //alert("Something wrong..");
        }
      });
      
     
    }
   if (this.addStore.invalid) {
      console.log("invalid form..");
      this.method();
      //alert("Something missing...");
      return;
    }
  }

  get s() { return this.addStore.controls; }

  //for image processing
  public onFileChanged(event: any) {
    this.status=1;
      this.selectedFile=event.target.files[0];
          const reader = new FileReader();
      if(event.target.files && event.target.files.length) {
        const [file] = event.target.files;
        reader.readAsDataURL(file);
        console.log("coming image: "+this.addStore.value.pic);
        reader.onload = () => { 
          this.imageSrc = reader.result as string;    
          this.addStore.patchValue({
            fileSource: reader.result
          });  
        };  
    }
    else{
      console.log("coming image: "+this.addStore.value.pic);
    }
  }

  method(){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
    })
  }
  responsemethod(){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Store not saved..',
    })
  }
  successMethod(){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your Store has been added',
      showConfirmButton: false,
      timer: 1500
    });
  }

  forDelete(){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your store has been deleted.',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your store is safe :)',
          'error'
        )
      }
    })
  }
 

}
