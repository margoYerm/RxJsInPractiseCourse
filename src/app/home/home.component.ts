import {Component, OnInit} from '@angular/core';
import {Course} from "../model/course";
import {interval, noop, Observable, of, throwError, timer} from 'rxjs';
import {catchError, delayWhen, finalize, map, retryWhen, shareReplay, tap} from 'rxjs/operators';
import { createHttpObservable } from '../common/util';
import {TypeForUndefined} from '../model/undefined';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    beginnerCourses$: Observable<Course[]>;
    advancedCourses$: Observable<Course[]>;

    constructor() {}

    ngOnInit() {
        const http$ = createHttpObservable('/api/courses');

        const courses$: Observable<Course[]> = http$
        .pipe(                     
            tap(() => console.log('Http request executed.')),
            map(result => Object.values(result["payload"])),
            shareReplay <Course[]>(), //<Course[]> for ts linter  
            retryWhen(errors => errors.pipe(
                delayWhen(() => timer(2000)) 
            )),         
        );

        //courses$.subscribe(); //for check how works shareReplay <Course[]>() in Network

        this.beginnerCourses$ = courses$
            .pipe(
                map(courses => courses
                    .filter(course => course.category == 'BEGINNER'))
            ) 

        this.advancedCourses$ = courses$
            .pipe(
                map(courses => courses
                    .filter(course => course.category == 'ADVANCED'))
            )         
    }

}
function ofType(): import("rxjs").OperatorFunction<void, unknown> {
    throw new Error('Function not implemented.');
}

