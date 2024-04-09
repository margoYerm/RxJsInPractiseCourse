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

    const http$ = createHttpObservable('/api/courses');

    const courses$ = http$
      .pipe(
        map(result => Object.values(result["payload"]))
      )

    courses$.subscribe(
      courses => console.log(courses),
      () => {}, //noop = no operation
      () => console.log("Completed!")
    )
    
  }

  
}
