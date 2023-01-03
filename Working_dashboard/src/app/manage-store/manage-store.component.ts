import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeUrl} from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ApiService } from '../Services/api.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-manage-store',
  templateUrl: './manage-store.component.html',
  styleUrls: ['./manage-store.component.css']
})
export class ManageStoreComponent implements OnInit {

  selectedFile!: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message!: string;
  imageName: any;
  manage_store!:FormGroup;
  totalStore:any=[];
  imageUrl!:string;
  store:number=0;
  i:number=1;
  x:any;
  total:any;
  searchText:any;
  page:number=1;
  perPageData:number=5;
  items:any;
  totalLength:any;
  constructor(private api:ApiService, private router:Router, private fb:FormBuilder, private sanitizer:DomSanitizer) {
    //user logged in or not
    if(!this.api.isUserLoggedIn()){this.router.navigate(['']); }
    if(this.api.getType()!="admin"){ this.router.navigate(["/dashboard"]); }
   }

   sanitizeImageUrl(): SafeUrl {
  
    this.imageUrl="C:/Users/DEll/eclipse-workspace/SweemingPoolProject/src/main/store/images";
    return this.sanitizer.bypassSecurityTrustUrl(this.imageUrl);
    }

  ngOnInit(): void {
    this.getAll();
    this.totalStoreList();
  }

 
  getAll(){
    this.api.getAllStores().subscribe((res)=>{
      console.log(res);
      this.totalStore=res;
      var keys = Object.keys(res);
      this.total = keys.length;
      this.totalLength = this.total;
    });
  }
  myFunction(x:any){
    console.log(x);
  }

  totalStoreList(){
    return this.totalStore.length;
  }

  deleteStore(id:number){
    console.log("id: "+id);
    this.api.deleteStore(id).subscribe((res)=>{
      console.log(res);
      this.getAll();
    });
  }

  editStore(data:any){
    console.log(data);
    this.api.editStore(data);
  }

  //sweet alert for delete conformation...

  forDelete(id:number){
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
        this.deleteStore(id);
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        );
        
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
