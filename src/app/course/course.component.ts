import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Course} from "../model/course";
import {
    debounceTime,
    distinctUntilChanged,
    startWith,
    tap,
    delay,
    map,
    concatMap,
    switchMap,
    withLatestFrom,
    concatAll, shareReplay, throttle, throttleTime, first, take
} from 'rxjs/operators';
import {merge, fromEvent, Observable, concat, interval, forkJoin} from 'rxjs';
import {Lesson} from '../model/lesson';
import { createHttpObservable } from '../common/util';
import { RxJsLoggingLevel, debug, setRxJsLoggingLevel } from '../common/debug';
import { Store } from '../common/store.service';


@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, AfterViewInit{
    courseId: number;
    course$: Observable<Course>;
    lessons$: Observable<Lesson []>
   
    @ViewChild('searchInput', { static: true }) input: ElementRef;

    constructor(
        private route: ActivatedRoute,
        private store: Store
        ) {}

    ngOnInit() {
        this.courseId = this.route.snapshot.params['id'];      
        this.course$ = this.store.selectCourseById(this.courseId); 
        
        this.loadLessons()
            .pipe(
                withLatestFrom(this.course$)
            )
            .subscribe(
                ([lessons, course]) => {
                    console.log('Lessons: ', lessons); //lessons array
                    console.log('Course: ', course); // course object
                }
            )
        
    }

    ngAfterViewInit() {            
        const searchLessons$ = fromEvent(this.input.nativeElement as HTMLInputElement, 'keyup')        
        .pipe(                
            map(event => (event.target as HTMLInputElement).value),                        
            debounceTime(500),
            distinctUntilChanged(),
            switchMap(search => this.loadLessons(search)),            
        )
        
        const initialLessons$ = this.loadLessons();

        this.lessons$ = concat(initialLessons$, searchLessons$)
    }

    loadLessons(search = ''): Observable<Lesson[]> {
        return createHttpObservable(
            `/api/lessons?courseId=${this.courseId}&pageSize=100&filter=${search}`
            )
                .pipe(
                    map(res => res["payload"])
                )
    }
}
