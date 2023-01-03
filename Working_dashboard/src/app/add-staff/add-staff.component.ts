import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../Services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.css']
})
export class AddStaffComponent implements OnInit {
  imageDetails!: any[];
  Submitted=false;
  addStaffForm!:FormGroup;
  fullPath:any;
  constructor(private fb:FormBuilder, private api:ApiService, private router: Router) { 
    //user logged in or not
    if(!this.api.isUserLoggedIn()){
      this.router.navigate(['']);
    }
    if(this.api.getType()!="admin"){
      this.router.navigate(["/dashboard"]);
    }
  }

  ngOnInit(): void {
    this.addStaffForm = this.fb.group({
      name:['',[Validators.required, Validators.pattern("^[a-zA-Z][a-zA-Z\\s]+$")]],
      email:['',[Validators.required,Validators.pattern("[a-z0-9._%+-]+@[a-z.-]+\.[a-z]{2,4}$")]],
      contact:['',[Validators.required, Validators.pattern("^[6-9]{1}[0-9]{9}$")]],
      password:['',[Validators.required, Validators.maxLength(8)]],
      gender:['',Validators.required],
      address:['',[Validators.required, Validators.pattern("^[a-zA-Z0-9.+',-_():][a-zA-Z0-9.+',-_():\\s]+$")]],
      doj:['',Validators.required],
      salary:['',[Validators.required, Validators.pattern("^[0-9]+$")]],
     
      
    });
  }
  addStaff(){
    this.Submitted = true;
  //send data if form is valid
    if(this.addStaffForm.valid)
    {
    
     //Method which send data to the api
      // this.api.AddStaff(this.addStaffForm.value).subscribe((res)=>{
      //   let value= JSON.parse(JSON.stringify(res));
      //   if(res==null){
      //     alert("something problem..");
      //   }
      //   else{
      //     console.log(value)
      //     alert("data saved..");
      //     this.router.navigate(['/manage-staff']);
      //   }
        
      // });
      
    }
    else
    {
      console.log("not valid form");
      Swal.fire('Invalid form', '', 'error');
      return;
    }

    Swal.fire({
      title: 'Add Staff?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Add',
      denyButtonText: `Don't Add`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        console.log(this.addStaffForm.value);
        this.api.AddStaff(this.addStaffForm.value).subscribe((res)=>{
          console.log(res);
          var val=JSON.parse(res);
          // console.log("abc: "+abc.indexOf(0));
          if(val['msg']=="dublicate email"){
            console.log(res);
            Swal.fire('Dublicate email', '', 'error');
          }
          if(val['msg']=="invalid details"){
            Swal.fire('Invalid details', '', 'error');
          }
          if(val['msg']=="record not added"){
            Swal.fire('Record not added', '', 'error');
          }
          if(val['msg']=="record added"){
            this.router.navigate(['/manage-staff']);
          }
        });
        
      } else if (result.isDenied) {
        return;
       // Swal.fire('Not Added', '', 'info');
      }
    })
  }
  get s(){return this.addStaffForm.controls;}
}
