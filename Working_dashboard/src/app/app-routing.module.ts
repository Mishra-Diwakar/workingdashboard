import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddItemComponent } from './add-item/add-item.component';
import { AddStaffComponent } from './add-staff/add-staff.component';
import { AddStoreComponent } from './add-store/add-store.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditItemComponent } from './edit-item/edit-item.component';

import { EditStaffComponent } from './edit-staff/edit-staff.component';
import { EditStoreComponent } from './edit-store/edit-store.component';
import { LoginComponent } from './login/login.component';
import { ManageItemComponent } from './manage-item/manage-item.component';
import { ManageStaffComponent } from './manage-staff/manage-staff.component';
import { ManageStoreComponent } from './manage-store/manage-store.component';
import { SignupComponent } from './signup/signup.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'
import { BookingComponent } from './booking/booking.component';
import { ManageBookingComponent } from './manage-booking/manage-booking.component';
import { EditBookingComponent } from './edit-booking/edit-booking.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ServicesSweemComponent } from './services-sweem/services-sweem.component';
import { PoolRenovationComponent } from './pool-renovation/pool-renovation.component';
import { PoolCleaningComponent } from './pool-cleaning/pool-cleaning.component';
import { PoolMaintananceComponent } from './pool-maintanance/pool-maintanance.component';
import { PrizingComponent } from './prizing/prizing.component';
import { TeamComponent } from './team/team.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { BookingFirstComponent } from './booking-first/booking-first.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';



const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'about', component:AboutComponent},
  {path:'service-sweem',component:ServicesSweemComponent},
  {path:'pool-renovation',component:PoolRenovationComponent},
  {path:'pool-cleaning',component:PoolCleaningComponent},
  {path:'pool-maintanance',component:PoolMaintananceComponent},
  {path:'prizing',component:PrizingComponent},
  {path:'team',component:TeamComponent},
  {path:'contact',component:ContactUsComponent},
  {path:'booking-front',component:BookingFirstComponent},
  {path:'add_store', component:AddStoreComponent},
  {path: 'signup', component:SignupComponent},
  {path: 'login', component:LoginComponent},
  {path: 'dashboard', component:DashboardComponent},
  {path: 'add-staff', component:AddStaffComponent},
  {path: 'manage-staff', component:ManageStaffComponent},
  {path: 'edit-staff', component:EditStaffComponent},
  {path: 'manage-store', component:ManageStoreComponent},
  {path: 'edit-store', component:EditStoreComponent},
  {path: 'add-item', component:AddItemComponent},
  {path: 'manage-item',component:ManageItemComponent},
  {path: 'edit-item', component:EditItemComponent},
  {path: 'booking', component:BookingComponent},
  {path: 'manage-booking', component:ManageBookingComponent},
  {path: 'edit-booking', component:EditBookingComponent},
  {path: 'forget-password' , component:ForgetPasswordComponent},
  {path:'**',component:PageNotFoundComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
