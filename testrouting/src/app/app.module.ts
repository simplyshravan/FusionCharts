import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from "ag-grid-angular/main";
import { FusionChartsModule } from 'angular-fusioncharts';
import FusionCharts from 'fusioncharts/core';
import Column2D from 'fusioncharts/viz/column2d';
import mscolumn2d from 'fusioncharts/viz/mscolumn2d';
import FusionTheme from 'fusioncharts/themes/es/fusioncharts.theme.fusion';
// import {ExportManager, ExportConfig } from 'fusionexport-node-client';
// import path from 'path';
FusionChartsModule.fcRoot(FusionCharts, mscolumn2d, FusionTheme);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    HeaderComponent
  ],
  imports: [
    // ExportManager,
    // ExportConfig,
    FusionChartsModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    AgGridModule.withComponents([]),
    RouterModule.forRoot([ //localhost/path1/path2 localhost/path1
      {
        path:'',
        component: HomeComponent
      },
      {
        path:'about',
        component: AboutComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
