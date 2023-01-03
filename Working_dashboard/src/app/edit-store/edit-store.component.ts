import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../Services/api.service';
import Swal from 'sweetalert2';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-edit-store',
  templateUrl: './edit-store.component.html',
  styleUrls: ['./edit-store.component.css']
})
export class EditStoreComponent implements OnInit {
editStore!:FormGroup;
Submitted=false;
selectedFile!:File;
data:any=[];
storeDataForEdit:any=[];
openDay:any;
closeDay:any;
openHour:any;
closeHour:any;
time:any;
status:number=0;

jsonDAta:any;
imageSrc!: string;
imageUrl!:string;
  constructor(private api:ApiService, private router:Router,private spinner: NgxSpinnerService, private fb:FormBuilder, private sanitizer:DomSanitizer) { 
    this.data=this.api.storeDataForEdit;
    //check user logged in or not
    if(!this.api.isUserLoggedIn()){this.router.navigate(['']); }
    if(this.api.getType()!="admin"){ this.router.navigate(["/dashboard"]); }
    this.status=0;
  }
  sanitizeImageUrl(): SafeUrl {
  
    this.imageUrl="C:/Users/DEll/eclipse-workspace/SweemingPoolProject/src/main/store/images";
    return this.sanitizer.bypassSecurityTrustUrl(this.imageUrl);
    }

  ngOnInit(): void {
    //do here validation
    
   this.editStore=this.fb.group({
    storename: ['', [Validators.required, Validators.pattern("^[a-zA-Z][a-zA-Z\\s]+$")]],
    name: ['', [Validators.required, Validators.pattern("^[a-zA-Z][a-zA-Z\\s]+$")]],
    email: ['', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z.-]+\.[a-z]{2,4}$")]],
    contact: ['', [Validators.required, Validators.pattern("^[6-9]{1}[0-9]{9}$")]],
    address: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9.+',-_():][a-zA-Z0-9.+',-_():\\s]+$")]],
    openDayFrom: ['', Validators.required],
    closeDayTo: ['', Validators.required],
    openingTime: ['', Validators.required],
    closingTime: ['', Validators.required],
    pic: [''],
    // pic: ['', Validators.required],
    time: ''
   });
   this.imageSrc=this.data.pic;
   this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 1 seconds */
      this.spinner.hide();
    }, 1000);

    //
    if(this.data.id==undefined){
      this.router.navigate(['/manage-store']);
    }
    //storing value inside controls
    this.editStore.controls['storename'].setValue(this.data.storename);
    this.editStore.controls['name'].setValue(this.data.name);
    this.editStore.controls['contact'].setValue(this.data.contact);
    this.editStore.controls['address'].setValue(this.data.address);
    this.editStore.controls['email'].setValue(this.data.email);
    this.editStore.controls['openDayFrom'].setValue(this.data.openDayFrom);
    this.editStore.controls['closeDayTo'].setValue(this.data.closeDayTo);
    this.editStore.controls['openingTime'].setValue(this.data.openingTime);
    this.editStore.controls['closingTime'].setValue(this.data.closingTime);
    this.editStore.controls['time'].setValue(this.data.time);
    console.log("pic: "+this.data.pic);
    console.log(this.data);
  }

  get s(){ return this.editStore.controls; }

  editStoreFormSubmit(){
    this.Submitted=true;
    if(this.editStore.valid){
    //for time related operation
      var OpenHour;
      var OpenTime;
      var CloseTime;
      var time;
      var timeSplit = this.editStore.value.openingTime.split(':');
      var timeSplitClose = this.editStore.value.closingTime.split(':');
      var CloseHour = timeSplitClose[0];
      var CloseMinute = timeSplitClose[1];
      var OpenHour = timeSplit[0];
      var OpenMinute = timeSplit[1];
      var hour = this.editStore.value.openingTime;

      
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
      time = this.editStore.value.openDayFrom + " - " + this.editStore.value.closeDayTo + " : " + OpenTime + " - " + CloseTime;

      this.editStore.value.time = time;

      console.log("valid form...");

      const uploadImageData = new FormData();

      uploadImageData.append('storename', this.editStore.value.storename);
      uploadImageData.append('name', this.editStore.value.name);
      uploadImageData.append('email', this.editStore.value.email);
      uploadImageData.append('contact', this.editStore.value.contact);
      uploadImageData.append('address', this.editStore.value.address);
      uploadImageData.append('time', this.editStore.value.time);
      uploadImageData.append('openDayFrom',this.editStore.value.openDayFrom);
      uploadImageData.append('openingTime',this.editStore.value.openingTime);
      uploadImageData.append("closeDayTo",this.editStore.value.closeDayTo);
      uploadImageData.append("closingTime",this.editStore.value.closingTime);
      uploadImageData.append('imageFile', this.selectedFile);

      // if(this.selectedFile==undefined){


      //   this.api.updateStoreWithoutImage(this.editStore.value, this.data.id).subscribe((res)=>{
      //     console.log(res);
      //   });
      // }


      
      Swal.fire({
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          if(this.selectedFile==undefined){
            this.api.updateStoreWithoutImage(this.editStore.value, this.data.id).subscribe((res)=>{
              if(res=="yes"){
                Swal.fire('Saved!','','success');
                this.router.navigate(['/manage-store']);
              }else{
                Swal.fire('Something went wrong', '', 'error');
              }
            });
          }

          if(this.selectedFile!=undefined){
               this.api.updateStore(uploadImageData,this.data.id).subscribe((res)=>{
               console.log(res);
               if(res=="yes"){
                 Swal.fire('Saved!', '', 'success');
                 this.router.navigate(['/manage-store'])
               }else{
                 Swal.fire('Something went wrong', '', 'error')
               }
              });
          }
       // Swal.fire('Saved!', '', 'success')
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info')
        }
      })

      }
      console.log(this.editStore.value);
      if(this.editStore.invalid){
        console.log(this.editStore.value);
         console.log("invalid form..");
         Swal.fire({
          position: 'top',
          icon: 'error',
          title: 'Invalid form...',
          showConfirmButton: false,
          timer: 1500
        })
       }
          
    }
        
    onFileChanged(event:any){
        this.selectedFile=event.target.files[0];
        const reader = new FileReader();
        this.status=1;
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      console.log("coming image: "+this.editStore.value.pic);
      reader.onload = () => { 
        this.imageSrc = reader.result as string;    
        this.editStore.patchValue({
          fileSource: reader.result
        });  
      };  
    }
    else{
      console.log("coming image: "+this.editStore.value.pic);
    }
  }
}
