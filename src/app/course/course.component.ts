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
    concatAll, shareReplay, throttle, throttleTime
} from 'rxjs/operators';
import {merge, fromEvent, Observable, concat, interval} from 'rxjs';
import {Lesson} from '../model/lesson';
import { createHttpObservable } from '../common/util';
import { RxJsLoggingLevel, debug, setRxJsLoggingLevel } from '../common/debug';


@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, AfterViewInit{
    courseId: string;
    course$: Observable<Course>;
    lessons$: Observable<Lesson[]>;

    @ViewChild('searchInput', { static: true }) input: ElementRef;

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.courseId = this.route.snapshot.params['id'];
        this.course$ = (createHttpObservable(`/api/courses/${this.courseId}`) as 
            Observable<unknown> as Observable<Course>)
            .pipe(
                //tap(course => console.log('Course', course)),
                debug(RxJsLoggingLevel.INFO, "course value"), 
            )
        setRxJsLoggingLevel(RxJsLoggingLevel.DEBUG);
    }

    ngAfterViewInit() {   
        //fromEvent(this.input.nativeElement as HTMLInputElement, 'keyup')    
        this.lessons$ = fromEvent(this.input.nativeElement as HTMLInputElement, 'keyup')        
        .pipe(                
            map(event => (event.target as HTMLInputElement).value),
            startWith(''),  
            //tap(search => console.log("search", search)),  
            debug(RxJsLoggingLevel.TRACE, "search"),                 
            debounceTime(500),
            distinctUntilChanged(),
            switchMap(search => this.loadLessons(search)),
            debug(RxJsLoggingLevel.DEBUG, "lessons value"), 
        )
        //.subscribe(console.log)
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
