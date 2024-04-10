import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { count } from 'console';
import { response } from 'express';
import { Observable, Observer, fromEvent, interval, timer } from 'rxjs';
import { createHttpObservable } from '../common/util';
import { map } from 'rxjs/operators';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  //createObservable$;

  constructor() { }

  ngOnInit() { 

    
    
  }

  
}
