import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../Services/api.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {
  submitted=false;
  editInventoryForm!:FormGroup;
  data:any;
  constructor(private api: ApiService, private fb:FormBuilder, private router:Router) { 
    this.data=this.api.inventoryDataForEdit;
    if(!this.api.isUserLoggedIn){  this.router.navigate(['']); }
    if(this.api.getType()!="admin"){ this.router.navigate(["/dashboard"]); }
  }

  ngOnInit(): void {
    this.editInventoryForm=this.fb.group({
      itemBrand:['',[Validators.required, Validators.pattern("^[a-zA-Z][a-zA-Z\\s]+$")]],
      itemName:['',[Validators.required, Validators.pattern("^[a-zA-Z][a-zA-Z\\s]+$")]],
      quantity:['',[Validators.required, Validators.pattern("^[0-9]+$")]],
      description:['',[Validators.required,Validators.pattern("^[a-zA-Z0-9.+',-_():][a-zA-Z0-9.+',-_():\\s]+$")]]
    });
    if(this.data.id==undefined){
      this.router.navigate(['/manage-item']);
    }
    this.editInventoryForm.controls['itemBrand'].setValue(this.data.itemBrand);
    this.editInventoryForm.controls['itemName'].setValue(this.data.itemName);
    this.editInventoryForm.controls['quantity'].setValue(this.data.quantity);
    this.editInventoryForm.controls['description'].setValue(this.data.description);


  }
  
  get f(){ return this.editInventoryForm.controls; }

  editInventorySubmit(){
    this.submitted=true;
    if(this.editInventoryForm.valid){
      console.log("call api from here...");
      this.api.editInventoryData(this.editInventoryForm.value,this.data.id).subscribe((res)=>{
        if(res==1){
          this.router.navigate(['/manage-item']);
        }
        if(res!=1)
        console.log("Something wrong..Try again..");
        
      });
    }
    if(this.editInventoryForm.invalid){
      console.log("invalid form...");
      return;
    }
  }

}
