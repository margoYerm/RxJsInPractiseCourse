import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { count } from 'console';
import { response } from 'express';
import { AsyncSubject, BehaviorSubject, Observable, Observer, ReplaySubject, Subject, concat, fromEvent, interval, merge, of, timer } from 'rxjs';
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

    /*const subject = new Subject();
    const series1$ = subject.asObservable();
    series1$.subscribe(val => console.log("early subscription: " + val));

    subject.next(1);
    subject.next(2);
    subject.next(3);
    //subject.complete()

    setTimeout(() => {
      series1$.subscribe(val => console.log("late subscription: " + val));
      subject.next(4);
    }, 3000)*/

    /*const subject = new BehaviorSubject(0);
    const series1$ = subject.asObservable();
    series1$.subscribe(val => console.log("early subscription: " + val));

    subject.next(1);
    subject.next(2);
    subject.next(3);
    //subject.complete()

    setTimeout(() => {
      series1$.subscribe(val => console.log("late subscription: " + val));
      subject.next(4);
    }, 3000)*/

    /*const subject = new AsyncSubject();
    const series1$ = subject.asObservable();
    series1$.subscribe(val => console.log("first subscription: " + val));

    subject.next(1);
    subject.next(2);
    subject.next(3);
    subject.complete();  
    
    setTimeout(() => {
      series1$.subscribe(val => console.log("second subscription: " + val));      
    }, 3000)*/

    const subject = new ReplaySubject();
    const series1$ = subject.asObservable();
    series1$.subscribe(val => console.log("first subscription: " + val));

    subject.next(1);
    subject.next(2);
    subject.next(3);
    //subject.complete();  
    
    setTimeout(() => {
      series1$.subscribe(val => console.log("second subscription: " + val)); 
      subject.next(4);     
    }, 3000)
    
  }
}

