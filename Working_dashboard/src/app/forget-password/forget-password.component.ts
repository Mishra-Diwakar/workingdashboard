import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../Services/api.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  forgetPassword!:FormGroup;
  generateOtp!:FormGroup;
  show:boolean=false;
  spinner:boolean=false;
  passwordResetPage!:FormGroup;
  passwordPage:boolean=false;
  otpMatched:boolean=false;
  passwordMatch:boolean=true;
  constructor(private fb:FormBuilder, private api:ApiService, private router:Router) { }
  submitted=false;
  ngOnInit(): void {
    this.forgetPassword=this.fb.group({
      email:['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z.-]+\\.[a-z]{2,4}$")]]
    });
    this.generateOtp=this.fb.group({
      otp:['',Validators.required]
    });
    this.passwordResetPage=this.fb.group(
      {
      password:['',Validators.required],
      confirm_password:['',Validators.required]
    });
  }
  get f(){ return this.forgetPassword.controls; }
  //at the time of generate otp
  forgetPasswordSubmit(){
    
    if(this.forgetPassword.valid){
      this.submitted=true;
      this.spinner=true;
      this.api.getOtp(this.forgetPassword.value).subscribe(res=>{
        // var result=JSON.stringify(res);
        // var intValue=parseInt(result);
        if(res[0]=="1"){
          this.spinner=false;
          this.called();
        }
        if(res[0]=="0"){
          Swal.fire({
            position:'top',
            title: 'Email Not Found',
            width: 300,
            padding: '3em',
            color: '#f01831',
            // background: '#fff url(/images/trees.png)',
            backdrop: `
            rgba(217, 124, 124, 0.8)
              left top
              no-repeat
            `
          })
        }
        console.log(res[0]=="1");
      },error=>{
        this.spinner=false;
        Swal.fire({
          position:'top',
          title: 'Email Not Found',
          width: 300,
          padding: '3em',
          color: '#f01831',
          // background: '#fff url(/images/trees.png)',
          backdrop: `
          rgba(217, 124, 124, 0.8)
            left top
            no-repeat
          `
        })
      });
      
    }
    if(this.forgetPassword.invalid){
      this.forgetPassword.markAllAsTouched()
    }
  }
  called(){
    this.show=true;
  }
  //at the time of otp submit
  otpSubmit(){
    this.submitted=false;
    
    if(this.generateOtp.valid){
      this.submitted=true;
      this.spinner=true;
      this.api.verifyOtp(this.generateOtp.value.otp).subscribe(res=>{
        if(res=="1"){
          this.spinner=false;
          this.show=false;
          this.passwordPage=true;
        }
        else{
          this.spinner=false;
          this.otpMatched=true;
          // return;
        }
      });
    }
    if(this.generateOtp.invalid){
      this.spinner=false;
      this.generateOtp.markAllAsTouched()
    }
  }
  passwordSubmit(){
    this.submitted=false;
    if(this.passwordResetPage.valid){
      this.submitted=true;
      this.checkMatching(this.passwordResetPage.value.password, this.passwordResetPage.value.confirm_password);
      console.log("valid form")
    }
    if(this.passwordResetPage.invalid){
      this.passwordResetPage.markAllAsTouched();
    }
    
  }
  checkMatching(pas:string, cpas:string){
    if(pas.length==cpas.length && pas.match(cpas)){
        this.passwordMatch=true;
        console.log("matched.."+pas,cpas);
        this.api.resetPassword(this.passwordResetPage.value).subscribe(res=>{
           console.log("after reseting password: "+res);
          if(res=="yes"){
            this.router.navigate(['/login'])
          }
          else{
            return;
            console.log("pasword not updated.");
          }
        })
    }
    else{
      this.passwordMatch=false;
      this.submitted=false;
      console.log("not matched.."+pas,cpas);
    }
  }
  

}


