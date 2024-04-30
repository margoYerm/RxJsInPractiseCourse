import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { Course } from "../model/course";
import { map, shareReplay, tap } from "rxjs/operators";
import { createHttpObservable } from "./util";

@Injectable({
  providedIn: 'root' //this only one store for all app
})

export class Store {
  private subject = new BehaviorSubject<Course[]>([]);
  courses$: Observable<Course[]> = this.subject.asObservable();

  init() {
    const http$ = createHttpObservable('/api/courses');
      http$
        .pipe(                     
            tap(() => console.log('Http request executed.')),
            map(result => Object.values(result["payload"])),                  
        )
        .subscribe(courses => this.subject.next(courses as Course[]));
  }

  selectBeginnerCourses() {
    return this.filterByCategory('BEGINNER');
  }

  selectAdvancedCourses() {
    return this.filterByCategory('ADVANCED');
  }

  filterByCategory(category: string) {
    return this.courses$
    .pipe(
        map(courses => courses
            .filter(course => course.category == category))
    ) 
  }
}

