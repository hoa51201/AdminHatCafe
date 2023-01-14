import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { DataService } from 'src/app/core/services/data.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    public dataService:DataService,
    private AuthenticatorService:AuthenticationService,
    private NotificationService:NotificationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }
  submit(){
    var staff = {
      staff_email : this.dataService.form.value.email,
      staff_password : this.dataService.form.value.password,
    }

    this.AuthenticatorService.Login(staff).subscribe(
      res=>{
        console.log(staff);
        if(this.AuthenticatorService.isAuthenticated()){
          this.NotificationService.alertSuccessMS("Thong bao","Ban thanh cong")
          this.router.navigate(['/main'])
        }
        else{
          this.NotificationService.alertWarnMS("Thong bao","Ban dien khong dung")
        }

      },
      error=>{
        {
          this.NotificationService.alertWarnMS("Thong bao","Ban dien khong dung")
        }
      }
    )
    console.log(staff)
    // this.dataService.POST('api/Staff/login',staff).subscribe(
    //   (data:any) => {console.log(data)},
    //   (error:any) => {console.log(error)}
    //   )
  }
}
