import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { count } from 'console';
import { response } from 'express';
import { Observable, Observer, Subject, concat, fromEvent, interval, merge, of, timer } from 'rxjs';
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

    const subject = new Subject();
    const series1$ = subject.asObservable();
    series1$.subscribe(console.log);

    //from(document, 'keyup');

    subject.next(1);
    subject.next(2);
    subject.next(3);
    subject.complete()

    

  }
}

