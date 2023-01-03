import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ManageStaffComponent } from '../manage-staff/manage-staff.component';
import { ApiService } from '../Services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-staff',
  templateUrl: './edit-staff.component.html',
  styleUrls: ['./edit-staff.component.css']
})
export class EditStaffComponent implements OnInit {
data:any;
editForm!:FormGroup;
submitted=false;
  constructor(private api:ApiService, private fb:FormBuilder, private router:Router) { 
  this.data=this.api.userDataForEdit;
  //check user logged in or not
    if(!this.api.isUserLoggedIn()){this.router.navigate(['']); }
    if(this.api.getType()!="admin"){ this.router.navigate(["/dashboard"]); }

   
  }

  ngOnInit(): void {
    // this.data=this.managestaff.editDataDetails;
    
    this.editForm = this.fb.group({
      name:['',[Validators.required, Validators.pattern("^[a-zA-Z][a-zA-Z\\s]+$")]],
      email:['',[Validators.required,Validators.pattern("[a-z0-9._%+-]+@[a-z.-]+\.[a-z]{2,4}$")]],
      contact:['',[Validators.required, Validators.pattern("^[6-9]{1}[0-9]{9}$")]],
      password:['',[Validators.required, Validators.maxLength(50)]],
      gender:['',Validators.required],
      active:['',Validators.required],
      address:['',[Validators.required, Validators.pattern("^[a-zA-Z0-9.+',-_():][a-zA-Z0-9.+',-_():\\s]+$")]],
      doj:['',Validators.required],
      salary:['',[Validators.required, Validators.pattern("^[0-9]+$")]]
    });
    if(this.data.id==undefined){
      this.router.navigate(['/manage-staff']);
    }

    this.editForm.controls['name'].setValue(this.data.name);
    this.editForm.controls['email'].setValue(this.data.email);
    this.editForm.controls['contact'].setValue(this.data.contact);
    this.editForm.controls['password'].setValue(this.data.password);
    this.editForm.controls['gender'].setValue(this.data.gender);
    this.editForm.controls['address'].setValue(this.data.address);
    this.editForm.controls['doj'].setValue(this.data.doj);
    this.editForm.controls['salary'].setValue(this.data.salary);
    this.editForm.controls['active'].setValue(this.data.active);

console.log( "value of active: "+this.editForm.controls['active'].setValue(this.data.active));  
  }
  get s(){ return this.editForm.controls;}
  editStaff(){
    this.submitted=true;
    //if form valid
    if(this.editForm.valid){
     this.updateAlert();
    }
    if(this.editForm.invalid){
      // alert("form not valid..");
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Invalid form..!',
        
      })
      return;
    }
  }

  updateAlert(){
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.api.updateUser(this.editForm.value,this.data.id).subscribe((res)=>{
          var val=JSON.parse(res);
          if(val['msg']=="record added"){
            this.router.navigate(['/manage-staff']);
          }
          if(val['msg']=="invalid details"){
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Invalid details',
              showConfirmButton: false,
              timer: 1500
            })
          }
          if(val['msg']=="email exists"){
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Email exists',
              showConfirmButton: false,
              timer: 1500
            })
          }
          else{
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Your work has not been saved',
              showConfirmButton: false,
              timer: 1500
            })
            // alert("Not updated...");
          }
        });
        // Swal.fire('Saved!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
        return;
        // this.router.navigate(['/manage-staff']);
      }
    })
  }

}
