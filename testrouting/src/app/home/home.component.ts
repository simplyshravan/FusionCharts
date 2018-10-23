import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {catchError} from 'rxjs/operators';
//import { ErrorObservable } from 'rxjs/ErrorObservable';
//import 'rxjs/add/operator/throw';
//import { HttpClientModule } from '@angular/common/http';
import { merge, Observable, of as observableOf, Subject } from 'rxjs';
//import { Observable } from 'rxjs/Observable';
//import 'rxjs/add/operator/catch';
//import 'rxjs/add/observable/throw';
//import { AgGridModule } from "ag-grid-angular/main";
import {GridOptions} from "ag-grid";
// import {ExportManager, ExportConfig } from 'fusionexport-node-client';
//import {RedComponentComponent} from "../red"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  companies =[{ 'name':'Infosys Technologies',
  'employees': 125000,
  'headoffice': 'Bangalore'},
  { 'name':'Cognizant Technologies',
    'employees': 100000,
    'headoffice': 'Bangalore'},
    { 'name':'Wipro',
      'employees': 115000,
      'headoffice': 'Bangalore'},
      { 'name':'Tata Consultancy Services (TCS)',
        'employees': 150000,
        'headoffice': 'Bangalore'},
        { 'name':'HCL Technologies',
          'employees': 90000,
          'headoffice': 'Noida'},
        ];
        show =false;
        values='';
        funds:string;
        i : string;
        j:any;
        myjson:any;
        heroes = ['Windstorm', 'Bombasto', 'Magneta', 'Tornado'];
        fundlist=[];
        fund:string;
        maxlengthofinput:number=0;
        private baseUrl: string = 'https://refdata-dev.npapps.paas.bip.uk.fid-intl.com/fund/refdata/v3/';
        dataSource= {
          // Chart Configuration
          "chart": {
              "caption": "Countries With Most Oil Reserves [2017-18]",
              "subCaption": "In MMbbl = One Million barrels",
              "xAxisName": "Country",
              "yAxisName": "Reserves (MMbbl)",
              "numberSuffix": "K",
              "theme": "fusion",
              // "theme": "fusion",
              // "caption":  'Returns as on '+this.selectedPeriod+ ' for '+this.selectedFCA +' (Currency '+this.chartdatawithdates[this.i]['currId']+')',
              // "xAxisname": "Quarter",
              // "yAxisName": (this.chartdatawithdates[this.i]['returnInd']!=null ? (this.chartdatawithdates[this.i]["returnInd"]=='N'?'Net':'Gross'):'')+' Returns (%)',
              // "numberPrefix": "$",
              "plotFillAlpha": "100",
              "divLineIsDashed": "0",
              "divLineDashLen": "1",
              "divLineGapLen": "1",
              "palettecolors":"#927865,#0A4D80,#7EBCE1",
              "setAdaptiveYMin":"1",
              "setAdaptiveYMax":"1",
              // "adjustDiv": "0",
              "numDivLines": "6",
              "drawCrossLine": "1",
              "exportEnabled": "1",
              "exportMode": "server"
          },
          // chartLabels = ['1 Month','3 Months','6 Months','1 Year','2 years ann.','3 years ann.','5 years ann.',['Since Inception','ann.']];
          "categories": [
              {
                  "category": [
                      {
                          "label": "1 Month"
                      },
                      {
                          "label": '3 Months'
                      },
                      {
                          "label": '6 Months'
                      },
                      {
                          "label": '1 Year'
                      }
                      ,
                      {
                          "label": '2 years ann.'
                      },
                      {
                          "label": '3 years ann.'
                      },
                      {
                          "label": 'Since Inception ann.'
                      }
                  ]
              }
          ],
          "dataset": [
              ,
              {
                  "seriesname": 'Fund',
                  "data": [{
                        "value": "290"
                    }, {
                        "value": "260"
                    }, {
                        "value": "180"
                    }, {
                        "value": "140"
                    }]
              },
              {
                  "seriesname":  'Benchmark',
                  "data":[{
                    "value": "290"
                }, {
                    "value": "260"
                }, {
                    "value": "180"
                }, {
                    "value": "140"
                }]
              },
              {
                  "seriesname": 'Relative',
                  "data": [{
                    "value": "290"
                }, {
                    "value": "260"
                }, {
                    "value": "180"
                }, {
                    "value": "140"
                }]
              }
          ]
      };
      // exportConfig = new ExportConfig();
        mydata:ReferenceDataApi ;
        mydata1:ReferenceDataApi ;
        refdata:any;
        public errorMsg;
        errflg:boolean;
        x:any;
        gridData: Object;
        private gridoptions: GridOptions;
        private gridApi;
        private gridColumnApi;
        private columnDefs;
        private sortingOrder;
        inputfund:String;
        columnTypes = {
          numberValue: {
            enableValue: true,
            aggFunc: "sum",
            editable: true,
            valueParser: this.numberParser
          },
          dimension: {
            enableRowGroup: true,
            enablePivot: true,
            enableValue: true
          }
        };
        numberParser(params) {
          return parseInt(params.newValue);
        }

        defaultColDef = {
          enableValue: true,
          enableRowGroup: true,
          enablePivot: true
        };

addHero(newHero: string) {
          if (newHero) {
            this.heroes.push(newHero);
          }
        }
searchclick(searchfund: string) {
          if (searchfund.length> 1) {
            this.fundlist.push(searchfund);             
          }   
        }
constructor(private http:HttpClient) {
  this.columnDefs=[
    {
      headerName:"perfhEntityId",
      field:"perfhEntityId",
      width:100,
      sortingOrder:["asc","desc"]
    },
    {
      headerName:"entityEomsId",
      field:"entityEomsId",
      width:100
    },
    {
      headerName:"entityMiasId",
      field:"entityMiasId",
      width:100
    },
    {
      headerName:"entityLegalName",
      field:"entityLegalName",
      width:100
    },
    {
      headerName:"entityBasecurrency",
      field:"entityBasecurrency",
      width:100
    },
    {
      headerName:"entityProductType",
      field:"entityProductType",
      width:100
    },
    {
      headerName:"entityIsinCd",
      field:"entityIsinCd",
      width:100
    },
    {
      headerName:"perfStartDate",
      field:"perfStartDate",
      width:100
    },
    {
      headerName:"ipPrefPerformanceReporting",
      field:"ipPrefPerformanceReporting",
      width:100
    },
    {
      headerName:"fundClassAcronym",
      field:"fundClassAcronym",
      width:100
    },
    {
      headerName:"managerAid",
      field:"managerAid",
      width:100
    },
    {
      headerName:"managerLastName",
      field:"managerLastName",
      width:100
    },
    {
      headerName:"managerFirstName",
      field:"managerFirstName",
      width:100
    },
    {
      headerName:"managerMiddleName",
      field:"managerMiddleName",
      width:100
    },
    {
      headerName:"managerFirstName",
      field:"managerFirstName",
      width:100
    },
    {
      headerName:"managerRole",
      field:"managerRole",
      width:100
    },
    {
      headerName:"managerStartDate",
      field:"managerStartDate",
      width:100
    },
    {
      headerName:"managerEndDate",
      field:"managerEndDate",
      width:100
    }
  ];
 }

searchfunds(searchfund: string) {
  this.inputfund=searchfund;
  if(this.maxlengthofinput < searchfund.length)
  {
    this.maxlengthofinput=searchfund.length;
    if (this.maxlengthofinput > 2 ){
      this.fundlist.push(searchfund); 
      this.show=true;
    }
  }
  else {
    this.maxlengthofinput=searchfund.length;
    for(this.i in this.fundlist){
    if(this.fundlist[this.i].startsWith(searchfund) && this.fundlist[this.i]!=searchfund )
     {
       this.fundlist.splice(this.fundlist.indexOf(this.fundlist[this.i]));
     }
  }
}
if(searchfund.length<3){
  this.show=false;
}
console.log("printing mydata");

//this.http.get<ReferenceDataApi>(this.baseUrl+"KTS").subscribe(data => this.mydata = data,error => this.errorMsg =error);
this.myjson=this.callService().subscribe(data => {
  this.gridoptions=<GridOptions>{};
 
  //this.gridoptions.rowData=data;
this.mydata = data;
for(this.j in this.mydata.items)
{ 
  this.gridData=this.mydata.items[this.j];
  //console.log(console.log("j "+this.j));
  //console.log(this.mydata.items[this.j]);
  //for(this.x in this.mydata.items[this.j]){
  //  console.log("x "+this.x);
  //  console.log(this.mydata.items[this.j][this.x]);
  //}
}
  //setInterval(()=>{
 //   this.cd.detectchanges();
 // },1000);
},error => this.errorMsg =error);

if(!this.errflg){
console.log(this.errorMsg);
for(this.j in this.mydata.items)
{ 
  this.myjson=this.mydata.items;
  console.log(console.log("j "+this.j));
  console.log(this.mydata.items[this.j]);
  for(this.x in this.mydata.items[this.j]){
    console.log("x "+this.x);
    console.log(this.mydata.items[this.j][this.x]);
  }
}
//console.log(this.mydata.items[0]);
}
}
errorHandler(error1:HttpErrorResponse){
    console.log("server error "+error1.message);
    this.errflg=true;
    //return new ErrorObservable("server error "+error1.message );
    //return observableOf(this.mydata1);
    return Observable.throw(error1.message || "Server Error");
}

callService(){
  return this.http.get<ReferenceDataApi>(this.baseUrl+"KTS").pipe(catchError(this.errorHandler));
}

OnGridReady(params){
  this.gridApi=params.api;
  this.gridColumnApi=params.columnApi;
  //let datavalue=[{"perfhEntityId":"72496 ","entityEomsId":"42310","entityMiasId":null,"entityLegalName":"Fidelity Sony Blended Bond Fund","entityBasecurrency":"GBP","entityProductType":"DC LIFE FUNDS","entityIsinCd":"GB00B28G3265","perfStartDate":1179792000000,"ipPrefPerformanceReporting":"FIL NAV-Performance","fundClassAcronym":"KTSB","managerAid":null,"managerLastName":null,"managerFirstName":null,"managerMiddleName":null,"managerRole":null,"managerStartDate":null,"managerEndDate":null}];
  //var allColumnIds = [];
  //  this.gridColumnApi.getAllColumns().forEach(function (column) {
  //    allColumnIds.push(column.colId);
  //  });
   this.callService().subscribe(data => {
    //this.mydata = data;
    params.api.setRowData(data.items);
    /*for(this.j in this.mydata.items)
    { 
      this.gridData=this.mydata.items[this.j];
    
    }*/
   },error => this.errorMsg =error);
   // params.api.setRowData(datavalue);
}

ngOnInit() {
  
  }
}

export interface ReferenceDataApi {
  items: ReferenceData[];
  total_count: number;
}
export interface ReferenceData {
  perfhEntityId: string;
  entityEomsId: string;
  entityMiasId: string;
  entityLegalName: string;
  entityBasecurrency: string;
  entityProductType: string;
  entityIsinCd: string;
  perfStartDate: Date;
  ipPrefPerformanceReporting: string;
  fundClassAcronym: string;
  managerAid: string;
  managerLastName: string;
  managerFirstName: string;
  managerMiddleName: string;
  managerRole: string;
  managerStartDate: Date;
  managerEndDate: Date;
}

