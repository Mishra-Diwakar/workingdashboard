import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../Services/api.service';

@Component({
  selector: 'app-store-votes',
  templateUrl: './store-votes.component.html',
  styleUrls: ['./store-votes.component.css']
})
export class StoreVotesComponent implements OnInit {

  constructor(private api:ApiService, private router:Router) {
    //when user logged out
    if(!this.api.isUserLoggedIn()){
      this.router.navigate(['']);
    }
   }

  ngOnInit(): void {
  }

}
