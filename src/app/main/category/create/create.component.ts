import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service'
import {Router} from '@angular/router'
import { NotificationService } from 'src/app/core/services/notification.service'
import { UtilityService } from 'src/app/core/services/utility.service';
import {ImgurApiService} from 'src/app/core/services/imgur-api.service';
import { HttpErrorResponse } from '@angular/common/http';


declare const Validator:any, $:any;
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})

export class CreateComponent implements OnInit {
    $:any = document.querySelector.bind(document)
    categories:any = [];
    imageSrc: any;
    show = false;
    done = false;
    constructor(
      private dataService:DataService,
      private route:Router,
      private notification :NotificationService,
      private utilityService:UtilityService,
      private imgurService: ImgurApiService
    ) { }
    backPage(){
        this.route.navigate(['/main/category/index'])
      }
    ngOnInit(): void {
        this.dataService.GET('api/Categories/get-item').subscribe(this.renderMenu)
        this.dataService.GET('api/Categories/get-item').subscribe((res:any)=>{
            console.log(res);
            this.categories = res
        })
        this.validate()
    }
      // validate form
    validate() {
        Validator({
          form: '#form-1',
          formGroupSelector: '.form-group',
          errorSelector: '.form-message',
          rules: [
            Validator.isRequired('#name'),
            Validator.isRequired('#desc'),
          ],
          onSubmit: (categories: any) => {
            categories={
              categories_slug:this.utilityService.makeSeoTitle(categories.categories_name),
              categories_images:this.imageSrc,
              ...categories
            }
            console.log(categories);
            this.dataService.POST('api/Categories/create-item',categories).subscribe((res:any)=>{
              this.notification.alertSuccessMS("thông báo",'Bạn đã thêm thành công .')
              this.route.navigate(['/main/category/index'])
            },err=>this.notification.alertErrorMS("Thông báo",'có lỗi xảy ra vui lòng thử lại'))
          }
        })
    }
      renderMenu(categories: any) {
        let html = '<option value="0">Chọn danh mục cha</option>'
        function buildMenu(items: any, saparate: string) {
          items.forEach((item: any) => {
            let temp = `<option value="${item.categories_id}">${saparate} ${item.categories_name}</option>`;
            html += temp
            // if (item.children && item.children.length > 0) {
            //   buildMenu(item.children, saparate + '--|');
            // }
          })
          return html
        }
        // categories.forEach((val: any) => {
        //   val.children = []
        //   categories.forEach((val1: any) => {
        //     if (val.categories_id == val1.categories_parent_id)
        //       val.children.push(val1)
        //   })
        // })
        // categories = categories.filter((val: any) => val.parentId == 0)
        $('#select_category').html(buildMenu(categories, ''))
    }
    readURL(event: any) {
      // console.log(event);
      if (event.target.files && event.target.files[0]) {
          const file = event.target.files[0];
          // console.log(file);
          this.show = true;
          this.done = false;
          // console.log(event.target.files[0].webkitRelativePath);
          const reader = new FileReader();
          reader.onload = e => this.imageSrc = reader.result;
  
          reader.readAsDataURL(file);

          // console.log(file);
          this.imgurService.upload(file).subscribe((res:any) =>{
            console.log(res.data.image.url)
            this.imageSrc = res.data.image.url
            this.done = true;
            this.show = false;
            console.log(this.imageSrc);
          },(err) =>{
            console.log(err)
          });
      }
  }
  
}
  
 


