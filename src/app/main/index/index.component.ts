// import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit,OnDestroy } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service'
import { MessageConstants } from 'src/app/core/common/Message'
import {Router,ActivatedRoute} from '@angular/router'
import { async, Subject } from 'rxjs';
import { DataTablesModule } from 'angular-datatables';
// import { AppService } from './app.service';
// import { CountryStatus, Country } from './models';
import { tap } from 'rxjs/operators';
// import { Component, } from '@angular/core';
// import { ChartDataSets, ChartOptions } from 'chart.js';
// import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  template :
  `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis'[primaryYAxis]='primaryYAxis'
  [title]='title'>
      <e-series-collection>
          <e-series [dataSource]='chartData' type='Line' xName='x' yName='y'></e-series>
      </e-series-collection>
  </ejs-chart>`,
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  constructor(
    private http: HttpClient,
    private route:Router,
    private router: ActivatedRoute,
    private dataService: DataService,
  ) { }
  data:any
  product_id:any;
  p: number = 1;
  showRecord: number = 5;
  records: any = []
  NO_FOUND_RECORDS_MSG = MessageConstants.NO_FOUND_RECORDS_MSG
  collection: any[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  public chartData: any;
  public title: any;
  public primaryXAxis: any;
  public primaryYAxis: any;
  lineChartData:any;
  lineChartLabels:any
  lineChartOptions:any
  lineChartColors:any
  lineChartLegend:any
  lineChartPlugins:any
  lineChartType:any
    ngOnInit(): void {
      
      this.lineChartData = [
        { data: [85, 72, 78, 75, 77, 75], label: 'Crude oil prices' },
      ];
     
      this.lineChartLabels = ['January', 'February', 'March', 'April', 'May', 'June'];
     
      this.lineChartOptions = {
        responsive: true,
      };
     
      this.lineChartColors= [
        {
          borderColor: 'black',
          backgroundColor: 'rgba(255,255,0,0.28)',
        },
      ];
     
      this.lineChartLegend = true;
      this.lineChartPlugins = [];
      this.lineChartType = 'line';
        }
  
}
