import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../Services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-staff',
  templateUrl: './manage-staff.component.html',
  styleUrls: ['./manage-staff.component.css']
})
export class ManageStaffComponent implements OnInit {
  userData:any=[];
  total:any;
  searchText:any;
  page:number=1;
  perPageData:number=5;
  items:any;
  totalLength:any;

  editDataDetails:any=[];
  constructor(private api:ApiService, private router:Router) {
    if(!this.api.isUserLoggedIn()){this.router.navigate(['']); }
    if(this.api.getType()!="admin"){ this.router.navigate(["/dashboard"]); }
    
   }

  ngOnInit(): void {
    this.getAll();
  }

  //Delete user by id
 deleteUser(data:any){
      this.api.deleteUser(data).subscribe((res)=>{
        var json=JSON.parse(res); // converting json object
        if(json['status']=="true"){
          this.getAll();
        }
      });
  }
  
//edit user
 editUser(data:any){
  this.api.editUser(data);
 }

  //get all user

  getAll(){
    this.api.getAllUsers().subscribe((res)=>{
      console.log(res);
      this.userData=res;
      var keys = Object.keys(res);
      this.total = keys.length;
      this.totalLength = this.total;
      
    });
  }

  forDelete(id:any){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Do you want to delete?',
      text: "It will not be recovered.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteUser(id);
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        return;
      }
    })
  }
  submitItems(items:any){
    if(items==undefined){
       return;
    }
    console.log("items value: "+items);
    this.perPageData=items;
  }

}
