import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../Services/api.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
addItem!:FormGroup;
submitted =false;
  constructor(private api:ApiService, private router:Router, private fb:FormBuilder) { 
    if(!api.isUserLoggedIn()){
      this.router.navigate(['']);
    }
    if(this.api.getType()!="admin"){
      this.router.navigate(["/dashboard"]);
    }
  }

  ngOnInit(): void {
    this.addItem=this.fb.group({
      itemBrand:['',[Validators.required, Validators.pattern("^[a-zA-Z][a-zA-Z\\s]+$")]],
      itemName:['',[Validators.required, Validators.pattern("^[a-zA-Z][a-zA-Z\\s]+$")]],
      quantity:['',[Validators.required, Validators.pattern("^[0-9]+$")]],
      description:['',[Validators.required, Validators.pattern("^[a-zA-Z0-9.+',-_():][a-zA-Z0-9.+',-_():\\s]+$")]]
    });
   
  }
  get f(){ return this.addItem.controls; }
  addItemSubmit(){
    this.submitted=true;
    if(this.addItem.valid){
      console.log(this.addItem);
      this.api.addItemToInventory(this.addItem.value).subscribe((res)=>{
        // console.log(res);
       
        if(res=="yes"){
          console.log(res);
          this.router.navigate(['manage-item']);

        }
        else
          alert("something wrong..");
      });
    }
    if(this.addItem.invalid){
      console.log("Invalid form..");
    }
  }

}
