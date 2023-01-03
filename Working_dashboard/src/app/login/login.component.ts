import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../Services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  allData:any;
  getData:any;
submitted =false;
email:any;
password:any;
emailReq:any;
emailPat:any;
passwordReq:any;
adminLogin !:FormGroup;


  constructor(private fb:FormBuilder, private api:ApiService, private router: Router) {
    if(api.getUserName()){
      this.router.navigate(['dashboard']);
    }
   }

  ngOnInit(): void {
    this.adminLogin = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z.-]+\\.[a-z]{2,4}$')]],
      password: ['', Validators.required]
    });
  }

  login(){
this.email=this.adminLogin.value.email;
this.password=this.adminLogin.value.password;
this.emailReq = this.adminLogin.get('email')?.touched && this.adminLogin.get('email')?.hasError('required');
this.emailPat = this.adminLogin.get('email')?.touched && this.adminLogin.get('email')?.hasError('pattern');
this.passwordReq = this.adminLogin.get('password')?.touched && this.adminLogin.get('password')?.hasError('required');


if((this.email)&&(this.password)&&(this.emailPat==false)&&(this.emailReq==false)&&(this.passwordReq==false)){
this.allData=this.adminLogin.value;
       this.api.validateAdmin(this.allData).subscribe(res => {
        if(res!=null){
          let value= JSON.parse(JSON.stringify(res));
          console.log("user valid....");
          console.log(value);
          this.api.authentication(value.name,value.type,value.active);
          this.successLogin();
          this.router.navigate(['dashboard']);
        }
        else{
          Swal.fire({
            position:'top',
            title: 'Invalid credentials...',
            width: 400,
            padding: '3em',
            color: '#716add',
            // background: '#fff url(/images/trees.png)',
            backdrop: `
              rgba(0,0,123,0.4)
              left top
              no-repeat
            `
          })
          console.log("invalid user")
        }
        
      
       })
    }
    else{
      this.adminLogin.markAllAsTouched();
    }
}

successLogin(){
  const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  
  Toast.fire({
    icon: 'success',
    title: 'Signed in successfully'
  })
}

}
