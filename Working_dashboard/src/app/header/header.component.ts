import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../Services/api.service';
import { Location } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { ThisReceiver } from '@angular/compiler';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  settingForm!:FormGroup;
  Submitted=false;
  popup=true;
  value:string="";

  constructor(private api: ApiService, private fb:FormBuilder) { }
user:any;
type:any;
status:any;
settingData:any=[];
  ngOnInit(): void {
    this.user=this.api.getUserName();
    this.type=this.api.getType();
    this.status=this.api.isUserLoggedIn();
    console.log("value of status: "+this.status);
    this.settingForm=this.fb.group({
      email:['',[Validators.required,Validators.pattern("[a-z0-9._%+-]+@[a-z.-]+\.[a-z]{2,4}$")]],
      contact:['',[Validators.required, Validators.pattern("^[6-9]{1}[0-9]{9}$")]],
      address:['',[Validators.required, Validators.pattern("^[a-zA-Z0-9.+',-_():][a-zA-Z0-9.+',-_():\\s]+$")]] 
    });
  }
  logout(){
    console.log("called...");
    this.api.logout();
  }

  get f(){ return this.settingForm.controls; }

  submitSettingData(){
    this.Submitted=true;
    if(this.settingForm.valid){
      console.log("Valid header...");
      this.api.setSettingData(this.settingForm.value).subscribe(res=>{
        if(res!=undefined){
          this.popup=false;
        }
      })
    }
    if(this.settingForm.invalid){
      console.log("Invalid header...");
    }
  }
  settingClicked(){
    //call api for set the all fields
    console.log("setting clicked called..");
    this.popup=true;
    this.api.getSettingData().subscribe(res=>{
      if(res!=undefined){
        this.settingData=res;
        this.api.settingData=res;
        this.settingForm.controls['email'].setValue(this.settingData.email);
        this.settingForm.controls['contact'].setValue(this.settingData.contact);
        this.settingForm.controls['address'].setValue(this.settingData.address);
      }
      
    });
  }
}
