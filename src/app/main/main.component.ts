import { Component, OnInit,ElementRef, Renderer2  } from '@angular/core';
import {AuthenticationService} from 'src/app/core/services/authentication.service'
import {NotificationService} from 'src/app/core/services/notification.service'
import { MessageConstants } from 'src/app/core/common/Message'
import {Menu} from 'src/app/core/common/Menu'


import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  $:any = document.querySelector.bind(document)
  constructor(
    private renderer: Renderer2,
    private authentication :  AuthenticationService,
    private notificationService :NotificationService,
    private router: Router
  ) { 
    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      console.log(event)
      this.currentUrl = event.url
      // console.log(this.currentUrl);
    },(s:any)=>{
      console.log(s)
    }
    );
  }

  menus:any = Menu.menus
  currentUrl:any
  ngOnInit(): void {
    console.log(this.menus);
    console.log(this.currentUrl);
  }

  ngAfterViewInit() {
    this.loadScripts();
  }

  public loadScripts() {
    this.renderExternalScript('assets/js/sb-admin-2.min.js').onload = () => {
    }
    this.renderExternalScript('assets/vendor/chart.js/Chart.min.js').onload = () => {
    }

  }
  public renderExternalScript(src: string): HTMLScriptElement {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    script.async = true;
    script.defer = true;
    this.renderer.appendChild(document.body, script);
    return script;
  }
  LogOut(){
    this.authentication.Logout();
    this.$('.btn-close-modal').click();
    this.notificationService.alertSuccessMS(MessageConstants.MSG,MessageConstants.LOGOUT_OK_MSG)
    this.router.navigate(['/login'])
  }
}