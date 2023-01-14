import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { SystemConstants } from '../common/System';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, throwError,  } from 'rxjs';
import { NotificationService } from './notification.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient,
    private auth : AuthenticationService,
    private noti: NotificationService,
    private formBuilder :FormBuilder,
  ) { }
  private httpOptions = {
    headers : new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': this.auth.isAuthenticated() ?`Bearer ${this.auth.getLoginUser().access_token}`: ''
    }),
  }


  form = this.formBuilder.group({
    email:["",[Validators.required,Validators.maxLength(100)]],
    password:["",[Validators.required,Validators.maxLength(100)]]
  })
  GET(path: any){
    return this.http.get(`${SystemConstants.BASE_API}/${path}`).pipe(
      catchError(this.handleError),
      res=>res,
    )
  }
  POST(path: any,data :object){
    return this.http.post(`${SystemConstants.BASE_API}/${path}`, data).pipe(
      catchError(this.handleError),
      res=>res,
    )
  }
  PUT(path: any,data :object){
    return this.http.put(`${SystemConstants.BASE_API}/${path}`, data).pipe(
      catchError(this.handleError),
      res=>res,
    )
  }
  DELETE(path: any,key :any, Id:any){
    return this.http.delete(`${SystemConstants.BASE_API}/${path}?${key}=${Id}`).pipe(
      catchError(this.handleError),
      res=>res,
    )
  }
  // DELETE(path: any, Id:any){
  //   return this.http.delete(`${SystemConstants.BASE_API}/${path}=${Id}`).pipe(
  //     catchError(this.handleError),
  //     res=>res,
  //   )
  // }
  private handleError(error: HttpErrorResponse) {
    if (error.status  ===0) {
      console.log('An error occurred: ' + error.error)
    }
    else {
      console.log('Back end return code: ' + error.status + '; body was: ' + JSON.stringify(error.error))
    }
    return throwError('Some thing wrong')
  }
}
