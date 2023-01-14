import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service'
import {Router,ActivatedRoute} from '@angular/router'
import { NotificationService } from 'src/app/core/services/notification.service'
import { UtilityService } from 'src/app/core/services/utility.service';
import {ImgurApiService} from 'src/app/core/services/imgur-api.service';

declare const Validator:any, $:any;
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  imageSrc: any;
  done = false;
  show = false;

  product:any = {};
  product_name:any;
  product_descriptions:any;
  id_parent:any;
  product_unit: any;
  product_quatity:any;
  product_prices:any;

  // currentId=this.router.snapshot.paramMap.get('product_id')
  currentSlug=this.router.snapshot.paramMap.get('product_slug')
  currentId2=this.router.snapshot.params.id
  $:any = document.querySelector.bind(document)
  products:any = [];
  constructor(
    private dataService:DataService,
    public imgurServicel:ImgurApiService,
      private route:Router,
      private router: ActivatedRoute,
      private notification :NotificationService,
      private utilityService:UtilityService
  ) { }

  backPage(){
    this.route.navigate(['/main/product/index'])
  }
  ngOnInit(): void {
    this.getData();
    
    console.log(this.currentId2);
  }
  getData(){
    this.dataService.GET('api/Product/get-item-by-id/'+this.currentId2).subscribe(
      (res:any)=>{
        console.log(res)
        this.product = res
        this.product_descriptions = res.product_description
        this.product_name = res.product_name
        this.product_quatity = res.product_quatity
        this.product_unit  = res.product_unit
        this.product_prices  = res.product_prices
        this.imageSrc = res.product_image
        this.dataService.GET('api/Product/get-item').subscribe(
          (data:any) =>{
          this.renderMenu(data)
        })
      }

      
    )
  }
  validate() {
    Validator({
      form: '#form-1',
      formGroupSelector: '.form-group',
      errorSelector: '.form-message',
      rules: [
        Validator.isRequired('#name'),
        Validator.isRequired('#desc'),
        Validator.isRequired('#price'),
        Validator.isRequired('#unit'),
        Validator.isRequired('#quantity'),
      ],
      onSubmit: (product: any) => {
        product={
          product_slug:this.utilityService.makeSeoTitle(product.product_name),
          product_image:this.imageSrc,
          ...product
        }
        console.log(product);
        this.dataService.POST('api/Product/update-item'+this.currentId2,product).
        subscribe((res:any)=>{
          console.log(res)
          this.notification.alertSuccessMS("thông báo",'Bạn đã thêm thành công .')
          this.route.navigate(['/main/product/index'])
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
      this.imgurServicel.upload(file).subscribe((res:any) =>{
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
