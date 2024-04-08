import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fromEvent, interval, timer } from 'rxjs';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const interval$ = interval(1000);
    //interval$.subscribe(val => console.log("Stream 1 " + val)); 

    const timer$ = timer(3000, 1000);
    const sub = timer$.subscribe(val => console.log("StreamTimer 1 " + val));
    setTimeout(() => {sub.unsubscribe()}, 5000);

    const click$ = fromEvent(document, 'click');
    click$.subscribe(
      event => console.log(event),
      err => console.log(err),
      () => console.log("Completed")
      );
    
  }

 


}
