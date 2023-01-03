import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../Services/api.service';

@Component({
  selector: 'app-firstheader',
  templateUrl: './firstheader.component.html',
  styleUrls: ['./firstheader.component.css']
})
export class FirstheaderComponent implements OnInit {
  data:any=[];
  email:any;
  address:any;
  contact:any;
  constructor(private viewportScroller: ViewportScroller, private api:ApiService) { 
    this.api.getSettingData().subscribe(res=>{
      if(res!=undefined){
        this.data=Object.values(res);
        this.email=this.data[1];
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
