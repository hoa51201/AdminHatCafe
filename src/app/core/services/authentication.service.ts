import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Observable, throwError,  } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { LoginUser } from '../domain/login.user';
import { Imgur } from '../domain/imgur.user';
import { SystemConstants } from '../common/System';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http: HttpClient,
    private jwthelperservice :JwtHelperService
  ) { }

  /*
    httpOptions chứa các thông tin của request mà gửi lên api

    Đọc thêm phần http protocol
  */ 
  private httpOptions = {
    headers : new HttpHeaders({
      'Content-Type':'application/json'
    }),
  }

  
  
  getUser(){
    return JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER)||'')
  }
  getLoginUser(){
    let user : LoginUser
    if(this.isAuthenticated()){
      user = new LoginUser(this.getUser().access_token,this.getUser().staff_id,this.getUser().staff_email,this.getUser().staff_name,
                  this.getUser().staff_image,this.getUser().staff_address,this.getUser().staff_phone_number)
    }
    else{
      user = null as any;
    }
    return user
  }

  Login(Staff:any) {
    let data = {
      staff_email: Staff.staff_email,
      staff_password : Staff.staff_password
    }
    console.log(data)
    return this.http.post(`${SystemConstants.BASE_API}/api/Staff/login`, data).pipe(
      catchError(this.handleError),
      // Pass qua thì sẽ chạy vào thằng tap
      // Tap xử lý dữ liệu
      tap((res:any)=>{
        localStorage.setItem(SystemConstants.CURRENT_USER,JSON.stringify(res))
        console.log(res)
      })
      );
      // (data:any) => {
      //   console.log(data)
      //   localStorage.setItem(SystemConstants.CURRENT_USER,JSON.stringify(data))
      // },
      // (error:any) => {console.log(error)}
      // )
      // .pipe(
      // // Tự động bắt lỗi
      // // Có lỗi sẽ chạy vào hàm handleError
      // // catchError return ra mã lỗi
      // catchError(this.handleError),
      // // Pass qua thì sẽ chạy vào thằng tap
      // // Tap xử lý dữ liệu
      // tap((res:any)=>{
      //   localStorage.setItem(SystemConstants.CURRENT_USER,JSON.stringify(res))
      // })
    
  }

  Logout(){
    localStorage.removeItem(SystemConstants.CURRENT_USER)
  }
  
  isAuthenticated():boolean {
    if(!localStorage.getItem(SystemConstants.CURRENT_USER)) return false;
    try{
      var token = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER)|| '{}').staff_token
      console.log(token)
      if(!this.jwthelperservice.isTokenExpired(token) && token!=null) return true;
      else return false;
    }
    catch{
      return false;
    }
  }

  handleError(error: HttpErrorResponse) {
    let strMsg = "";
    if (error.error instanceof ErrorEvent) {
      strMsg = 'An error occurred: ' + error.error.message
      console.log('An error occurred: ' + error.error.message)
    }
    else {
      strMsg = 'Back end return code: ' + error.status + '; body was: ' + JSON.stringify(error.error)
      console.log('Back end return code: ' + error.status + '; body was: ' + JSON.stringify(error.error))
    }
    return throwError(strMsg)
  }
}
/*
  file này là để xác thực người dùng
*/