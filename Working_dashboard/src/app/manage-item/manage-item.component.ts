import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../Services/api.service';

@Component({
  selector: 'app-manage-item',
  templateUrl: './manage-item.component.html',
  styleUrls: ['./manage-item.component.css']
})
export class ManageItemComponent implements OnInit {
  inventoryList:any=[]; 
  searchText:any;
  page:number=1;
  perPageData:number=5;
  items:any;
  totalLength:any;
  constructor(private api:ApiService, private router:Router) {
    if(!this.api.isUserLoggedIn()){this.router.navigate(['']); }
    if(this.api.getType()!="admin"){ this.router.navigate(["/dashboard"]); }
   }

  ngOnInit(): void {
    this.getAllInventory();

  }
  getAllInventory(){
    this.api.getAllItemList().subscribe((res)=>{
      console.log(res);
      this.inventoryList=res;
      var total=Object.keys(res);
      this.totalLength = total.length;
      console.log(this.totalLength);
    });
  }
  editInventory(data:any){
    this.api.inventoryDataForEdit=data;
  }
  deleteInventory(id:number){
    this.api.deleteInventory(id).subscribe((res)=>{
      if(res==1){
        this.getAllInventory();
      }
      if(res!=1){
        alert("Something wrong...");
      }
    });
  }
  submitItems(items:any){
    if(items==undefined){
       return;
    }
    console.log("items value: "+items);
    this.perPageData=items;
  }

}
