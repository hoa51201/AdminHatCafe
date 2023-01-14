import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { DataTablesModule } from 'angular-datatables';
import { DataService } from 'src/app/core/services/data.service'
import { MessageConstants } from 'src/app/core/common/Message'
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-update',
  templateUrl: './billdetails.component.html',
  styleUrls: ['./billdetails.component.css']
})
export class UpdateComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  notification: any;
  route: any;
  constructor(
    private router: ActivatedRoute,
    private dataService: DataService,
  ) { }
    stateOptions=["chờ xử lí", "đang giao hàng","giao thành công"]
    
  currentSlug=this.router.snapshot.paramMap.get('id')
  bill_id:any;
  customer_name:any;
  customer_email:any;
  customer_phone_number:any;
  customer_address:any;
  bill_product_quantity:any;
  bill_product_prices:any;
  bill_product_name:any;
  bill_product_id:any;
  bill_product_total:any;
  bill_state: any;
  item: any;
  collection: any[] = [];
  ngOnInit(): void {
    this.getData();
  
    
  }

  getData(){
    this.dataService.GET('api/Bill/get-item/'+this.currentSlug).subscribe(
      (res:any)=>{
        console.log('data',res)
        this.item=res;
       
      }
    )
    this.dataService.GET('api/BillDetails/get-item-by-id/'+this.currentSlug).subscribe(
      (res:any)=>{
        console.log('data',res)
        this.collection=res;
       
      }
    )
  }

  UpdateState(item:any) {
    this.dataService.POST('api/Bill/update-item/'+this.currentSlug,item).subscribe((res:any)=>{
     
    this.getData();
      console.log("data",res);
    })
  }
  // closeModal() {
  //   this.closeModal();
  // }
}

