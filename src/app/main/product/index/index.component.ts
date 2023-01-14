import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service'
import { MessageConstants } from 'src/app/core/common/Message'
import {Router,ActivatedRoute} from '@angular/router'

declare var $: any; 
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private route:Router,
    private router: ActivatedRoute,
    private dataService: DataService,
  ) { }
  product_id:any;
  p: number = 1;
  showRecord: number = 5;
  records: any = []
  NO_FOUND_RECORDS_MSG = MessageConstants.NO_FOUND_RECORDS_MSG
  collection: any[] = [];

  search(value: any) {
    var arr: any = []
    console.log(value.value);
    this.records.forEach((e: any) => {
      if (e.product_name.toLowerCase().match(value.value.toLowerCase())) {
        arr.push(e)
      }
    })
    this.collection = arr
    this.collection = arr.map((product:any,i:any)=>{
      /*
        e : là từng bản ghi qua mỗi lần lặp, 
        i là index của từng bản ghi

        !map parameter
      */
        return {
              index: i,
             ...product
            }
    })
  }
  ngOnInit(): void {
    this.getData();
  }
  getData(){
    this.dataService.GET('api/Product/get-item').subscribe(
      (res:any)=>{
        this.records = res

        // this.collection = res.map((e:any,i:any)=>{
        //   /*
        //     e : là từng bản ghi qua mỗi lần lặp, 
        //     i là index của từng bản ghi

        //     !map parameter
        //   */
        //   return {
        //     index : i,
        //     categoryID: e.categoryID,
        //     slug : e.slug,
        //     name: e.name,
        //     parentId: e.parentID,
        //     subData: e.subData
        //   }
        // })
        this.collection = res.sort((a:any,b:any)=>
        {
          if (a>b) return 1
          return -1
        })
        this.collection =this.collection.map((product: any, i: any) => {
          return {
            index: i,
           ...product
          }
        })

        console.log(res)
      }
    )
  }
  handleDelete(){
    this.dataService.DELETE('api/Product/delete-item','product_id',this.product_id).subscribe(
      (res:any)=>{
        
        this.getData()
    })
    
  }
  GetId(id:any){
    this.product_id = id
    console.log(id)
  }
  close() {
    $("#delete-cat-modal").modal("hide");
  }
}