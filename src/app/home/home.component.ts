import {Component, OnInit} from '@angular/core';
import {Course} from "../model/course";
import {interval, noop, Observable, of, timer} from 'rxjs';
import {catchError, delayWhen, map, retryWhen, shareReplay, tap} from 'rxjs/operators';
import { createHttpObservable } from '../common/util';
import {TypeForUndefined} from '../model/undefined';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    beginnerCourses: Course[] | TypeForUndefined;
    advancedCourses: Course[] | TypeForUndefined;

    constructor() {}

    ngOnInit() {
        const http$ = createHttpObservable('/api/courses');

        const courses$ = http$
        .pipe(
            map(result => Object.values(result["payload"]))
        );

    courses$.subscribe(
        courses => {             
            this.beginnerCourses = courses
                .filter(course => course['category'] == 'BEGINNER');
            this.advancedCourses = courses
                .filter(course => course['category'] == 'ADVANCED');           
        },
        noop, //noop = no operation
        () => console.log("Completed!")
    )
      
    

    }

}
