import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { Course } from "../model/course";
import { filter, map, shareReplay, tap } from "rxjs/operators";
import { createHttpObservable } from "./util";
import { fromPromise } from "rxjs/internal-compatibility";

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

  selectCourseById(courseId: number) {
    return this.courses$
    .pipe(
        map(courses => courses.find(course => course.id == courseId)),
        filter(course => !!course) //convert to boolean (true) because initial value of courses$ is undefined (empty array)
    )
  }

  filterByCategory(category: string) {
    return this.courses$
    .pipe(
        map(courses => courses
            .filter(course => course.category == category))
    )
  }

  saveCourse(courseId: number, changes): Observable<any> {
    const courses = this.subject.getValue(); //get array of courses
    const courseIndex = courses.findIndex(course => course.id == courseId);
    const newCourses = courses.slice(0);
    newCourses[courseIndex] = {
      ... courses[courseIndex],
      ... changes
    };
    this.subject.next(newCourses);
    return fromPromise(
      fetch(`api/courses/${courseId}`, {
        method: 'PUT',
        body: JSON.stringify(changes),
        headers: {
          'content-type': 'application/json'
        }
      })
    )
  }
}

