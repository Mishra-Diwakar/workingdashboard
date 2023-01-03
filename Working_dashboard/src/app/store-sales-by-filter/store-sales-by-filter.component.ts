import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../Services/api.service';

@Component({
  selector: 'app-store-sales-by-filter',
  templateUrl: './store-sales-by-filter.component.html',
  styleUrls: ['./store-sales-by-filter.component.css']
})
export class StoreSalesByFilterComponent implements OnInit {

  constructor(private api:ApiService,private router:Router) {
    //when user logged out
    if(!this.api.isUserLoggedIn()){
      this.router.navigate(['']);
    }
   }

  ngOnInit(): void {
  }

}
