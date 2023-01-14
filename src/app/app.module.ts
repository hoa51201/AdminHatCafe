import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryComponent } from './main/category/category.component';
import { ProductComponent } from './main/product/product.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { MainComponent } from './main/main.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ImgurApiService }from 'src/app/core/services/imgur-api.service';
import { LoginComponent } from './auth/login/login.component';
import { NgChartsModule } from 'ng2-charts';
// import { StaffComponent } from './src/app/main/staff/staff.component';

import { DataTablesModule } from "angular-datatables";
import { JwtModule } from "@auth0/angular-jwt";
import { SystemConstants } from './core/common/System';

export function tokenGetter() {
  var result = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER)|| '{}').staff_token
  //  localStorage.getItem(SystemConstants.CURRENT_USER)
  console.log(result);
  return result;
}

@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    ProductComponent,
    MainComponent,
    // StaffComponent,
    
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    NgChartsModule,
    DataTablesModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        // allowedDomains: ["example.com"],
        // disallowedRoutes: ["http://example.com/examplebadroute/"],
      },
    }),

  ],
  providers:[ImgurApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }