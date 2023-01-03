import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { ApiService } from '../Services/api.service';

@Component({
  selector: 'app-firstfooter',
  templateUrl: './firstfooter.component.html',
  styleUrls: ['./firstfooter.component.css']
})
export class FirstfooterComponent implements OnInit {
data:any=[];
email:any;
contact:any;
address:any;
  constructor(private viewportScroller: ViewportScroller, private api:ApiService) {
    this.api.getSettingData().subscribe(res=>{
      if(res!=undefined){
        this.data=Object.values(res);
        this.email=this.data[1]
        this.address=this.data[2];
        this.contact=this.data[3];
      }
    });
   }

  ngOnInit(): void {
  }
  public onClick(elementId: string): void { 
    this.viewportScroller.scrollToAnchor(elementId);
}

}
