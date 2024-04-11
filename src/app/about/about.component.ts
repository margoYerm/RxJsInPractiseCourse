import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { count } from 'console';
import { response } from 'express';
import { Observable, Observer, concat, fromEvent, interval, of, timer } from 'rxjs';
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

    const source1$ = of(1, 2, 3);
    const source2$ = of(4, 5, 6);
    const source3$ = of(7, 8, 9);
    
    const result$ = concat(source1$, source2$, source3$);
    //result$.subscribe(val => console.log(val)); 
    //the same result with different syntax 
    result$.subscribe(console.log); 
    
  }

  
}
