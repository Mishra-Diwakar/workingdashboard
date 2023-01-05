import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
url:any;
userDataForDelete:any=[];
userDataForEdit:any=[];
storeDataForEdit:any=[];
inventoryDataForEdit:any=[];
bookingDataForEdit:any=[];
settingData:any=[];

  constructor(private http: HttpClient) { }
  validateAdmin(data:any){
    this.url = "http://localhost:9191/login"  
    return this.http.post(this.url,data);
   
  }

  //#below code for authentication

  authentication(username:string, type:string, active:string){
    localStorage.setItem('username',username);
    localStorage.setItem('type',type);
    localStorage.setItem('active',active);
    //localStorage.setItem('password',password);
  //  let usr= sessionStorage.getItem('username');
  //  let pwd= sessionStorage.getItem('password');
  
  }
  isUserLoggedIn(){
    let user= localStorage.getItem('username');
    let type= localStorage.getItem('type');
    console.log(!(user===null))
    return !(user===null);
  }
  logout(){
    localStorage.removeItem('username');
    localStorage.removeItem('type');
    localStorage.removeItem('active');
  }
  getUserName(){
    let user=localStorage.getItem('username');
    return user;
  }
  getType(){
    return localStorage.getItem('type');
  }
//#above code for testing

//api for set the setting data to database
setSettingData(data:any){
  this.url="http://localhost:9191/settings";
  return this.http.post(this.url,data);
}

//api for get the setting data from the database
getSettingData(){
  this.url="http://localhost:9191/get-setting-data";
  return this.http.get(this.url);
}
//api for add staff
AddStaff(data:any)
{
  this.url="http://localhost:9191/add-staff";
  return this.http.post(this.url,data,{responseType:'text'});  
}

//total staff
totalStaff(){
  this.url="http://localhost:9191/total-staff";
  return this.http.get(this.url);
}

//total active staff
totalActiveStaff(){
  this.url="http://localhost:9191/total-active-Staff";
  return this.http.get(this.url);
}

getAllUsers(){
    this.url="http://localhost:9191/users";
    return this.http.get(this.url);
}

// deleteUser(id:Number){
//   // console.log(btoa(id.toString()));
//   this.url="http://localhost:9191/delete/"+id;
//   return this.http.delete(this.url);
  
// }
deleteUser(data:any){
   console.log(data);
  this.url="http://localhost:9191/delete";
  return this.http.post(this.url,data,{responseType:'text'});
  
}

editUser(data:any){
  this.userDataForEdit=data;  
}
editStore(data:any){
  this.storeDataForEdit=data;
}

editInventory(data:any){
  this.inventoryDataForEdit=data;
}

updateUser(data:any,id:number){
  data['id']=id;
  this.url="http://localhost:9191/update";
  return this.http.put(this.url,data,{responseType:'text'});
}

//API for store operation

//ADD store data by this api

addStoreData(data:any){

  this.url="http://localhost:9191/add-store";
  return this.http.post(this.url,data,{responseType:'text'});

}

// get all store list

getAllStores(){
  this.url="http://localhost:9191/manage-store";
  return this.http.get(this.url);
}

deleteStore(id:number){
  this.url="http://localhost:9191/delete-store/"+id;
  return this.http.delete(this.url);
}

updateStore(data:any, id:number){
  this.url="http://localhost:9191/update-store/"+id;
  return this.http.put(this.url,data,{responseType:'text'});
}

updateStoreWithoutImage(data:any, id:number){
  data['id']=id;
  this.url="http://localhost:9191/update-store/withoutImage/"+id;
  return this.http.put(this.url,data,{responseType:'text'});
}

//inventory related operation

addItemToInventory(data:any){
  this.url="http://localhost:9191/add-inventory";
  return this.http.post(this.url,data,{responseType:'text'});
}

getAllItemList(){
  console.log("api called...");

  this.url="http://localhost:9191/inventory-list";
  return this.http.get(this.url);
}

editInventoryData(data:any, id:number){
  this.url="http://localhost:9191/update-inventory/"+id;
  return this.http.put(this.url,data);
}

deleteInventory(id:number){
  this.url="http://localhost:9191/delete-inventory/"+id;
  return this.http.delete(this.url);
}

//api for booking 

//add booking
booking(data:any){
  this.url="http://localhost:9191/add-booking";
  return this.http.post(this.url,data,{responseType:'text'});
}

// get booking list
bookinList(){
  this.url="http://localhost:9191/booking-list";
  return this.http.get(this.url);
}

// download pdf
downloadBooking(data:any){
  this.url="http://localhost:9191/export-to-pdf";
  return this.http.post(this.url,data, {responseType: 'blob'});
}

//today booking 
todayBooking(){
  this.url="http://localhost:9191/booking-list/today";
  return this.http.get(this.url);
}

// edit booking
editBooking(data:any,id:number){
  this.url="http://localhost:9191/edit-booking/"+id;
  return this.http.put(this.url,data,{responseType:'text'});
}

// delete booking
deleteBooking(id:number){
  this.url="http://localhost:9191/delete-booking/"+id;
  return this.http.delete(this.url,{responseType:'text'});
}

//forget password
getOtp(data:any){
  this.url="http://localhost:9191/forget/password";
  return this.http.post(this.url,data,{responseType:'text'});
}
//verify otp
verifyOtp(otp:string){
  this.url="http://localhost:9191/verify/"+otp;
  return this.http.post(this.url,{responseType:'text'});
}
//reset password 
resetPassword(password:any){
  this.url="http://localhost:9191/reset/password";
  return this.http.post(this.url,password,{responseType:'text'});
}
public exportAsExcelFile(json:any[], excelFileName:string):void{
  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
  const workbook: XLSX.WorkBook = {Sheets: { 'data':worksheet }, SheetNames:['data'] };
  const excelBuffer: any= XLSX.write(workbook, { bookType:'xlsx', type:'array'});
  this.saveAsExcelFile(excelBuffer, excelFileName);
}
EXCEL_TYPE="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
EXCEL_EXTENSION=".xlsx";
private saveAsExcelFile(buffer:any, fileName:string):void{
  const data: Blob = new Blob([buffer], {type:this.EXCEL_TYPE});
  FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime()+ this.EXCEL_EXTENSION);
}
}
