import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../Services/api.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-generate-pdf',
  templateUrl: './generate-pdf.component.html',
  styleUrls: ['./generate-pdf.component.css']
})
export class GeneratePdfComponent implements OnInit {
id:any;
name:any;
contact:any;
bookingDate:any;
time:any;
exit_time:any;
address:any;
  constructor(private api:ApiService, private router:Router) { 
    if(!this.api.isUserLoggedIn()){this.router.navigate(['']);}
  }

  ngOnInit(): void {
    if(this.api.bookingDataForEdit.bookingId==undefined){
      this.router.navigate(['/manage-booking']);
    }
    this.id=this.api.bookingDataForEdit.bookingId;
    this.name=this.api.bookingDataForEdit.name;
    this.contact=this.api.bookingDataForEdit.contact;
    this.bookingDate=this.api.bookingDataForEdit.bookingDate;
    this.time=this.api.bookingDataForEdit.time;
    this.address=this.api.bookingDataForEdit.address;
  }
  public openPDF(): void {
    let DATA: any = document.getElementById('pdfData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('angular-demo.pdf');
    });
  }

}
