/*import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
*/
import { Component, OnInit } from '@angular/core';
import {trigger,style,transition,animate,keyframes,query,stagger} from '@angular/animations';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  //styles:[`
 //  p { font-weight: bold ;}
 //  div { color: gray; }
 // `]
  styleUrls: ['./header.component.css'],
  /*animations: [
    trigger('goals', [
      transition('* => *',[
      query(':enter', style({ opacity:0 }),{ optional:true }),

      query(':enter',stagger('300ms',[
        animate('.6s ease-in',keyframes([
          style({opacity:0,transform:'translateY(-75%),offset:0'}),
          style({opacity:.5,transform:'translateY(35px),offset:.3'}),
          style({opacity:1,transform:'translateY(0),offset:1'}),
        ]))]),{optional:true}),

        query(':leave',stagger('300ms',[
          animate('.6s ease-in',keyframes([
            style({opacity:1,transform:'translateY(0),offset:0'}),
            style({opacity:.5,transform:'translateY(35px),offset:.3'}),
            style({opacity:0,transform:'translateY(-75%),offset:1'}),
          ]))]),{optional:true}),
    ])

  ])
]*/
})
export class HeaderComponent implements OnInit {
// itemCount: number;
// btnText: string='Add an item';
// goalText: string ='My first life goal';
// goals=['My 1st life goal','I want to clomb mountain','Go ice skating'];
 username : string;
 appname : string;

 constructor() { }

  ngOnInit() {
  //  this.itemCount=this.goals.length;
    this.username="Shravan";
    this.appname="Perf Repo Extract";
  }

 // addItem(){
 //   this.goals.push(this.goalText);
 //   this.goalText='';
//    this.itemCount=this.goals.length;
//}
//removeItem(i){
//  this.goals.splice(i,1);
//}
}
