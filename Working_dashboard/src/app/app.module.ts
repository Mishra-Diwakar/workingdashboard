import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddStoreComponent } from './add-store/add-store.component';
import { StoreSalesByFilterComponent } from './store-sales-by-filter/store-sales-by-filter.component';
import { StoreVotesComponent } from './store-votes/store-votes.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { AddStaffComponent } from './add-staff/add-staff.component';
import { ManageStaffComponent } from './manage-staff/manage-staff.component';
import { EditStaffComponent } from './edit-staff/edit-staff.component';
import { ManageStoreComponent } from './manage-store/manage-store.component';
import { DataTablesModule } from 'angular-datatables';
import { EditStoreComponent } from './edit-store/edit-store.component';
import { AddItemComponent } from './add-item/add-item.component';
import { ManageItemComponent } from './manage-item/manage-item.component';
import { EditItemComponent } from './edit-item/edit-item.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BookingComponent } from './booking/booking.component';
import { ManageBookingComponent } from './manage-booking/manage-booking.component';
import { EditBookingComponent } from './edit-booking/edit-booking.component';
import { DatePipe } from '@angular/common';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SearchPipe } from './search.pipe';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FirstheaderComponent } from './firstheader/firstheader.component';
import { FirstfooterComponent } from './firstfooter/firstfooter.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './services/services.component';
import { PoolRenovationComponent } from './pool-renovation/pool-renovation.component';
import { PoolCleaningComponent } from './pool-cleaning/pool-cleaning.component';
import { PoolMaintananceComponent } from './pool-maintanance/pool-maintanance.component';
import { PrizingComponent } from './prizing/prizing.component';
import { TeamComponent } from './team/team.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { RegisterComponent } from './register/register.component';
import { BookingFirstComponent } from './booking-first/booking-first.component';
import { ServicesSweemComponent } from './services-sweem/services-sweem.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component'; 
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    AddStoreComponent,
    StoreSalesByFilterComponent,
    StoreVotesComponent,
    LoginComponent,
    SignupComponent,
    AddStaffComponent,
    ManageStaffComponent,
    EditStaffComponent,
    ManageStoreComponent,
    EditStoreComponent,
    AddItemComponent,
    ManageItemComponent,
    EditItemComponent,
    PageNotFoundComponent,
    BookingComponent,
    ManageBookingComponent,
    EditBookingComponent,
    ChangePasswordComponent,
    SearchPipe,
    FirstheaderComponent,
    FirstfooterComponent,
    HomeComponent,
    AboutComponent,
    ServicesComponent,
    PoolRenovationComponent,
    PoolCleaningComponent,
    PoolMaintananceComponent,
    PrizingComponent,
    TeamComponent,
    ContactUsComponent,
    RegisterComponent,
    BookingFirstComponent,
    ServicesSweemComponent,
    ForgetPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    DataTablesModule,
    FormsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    BrowserAnimationsModule
    // NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
