import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    document.addEventListener('click', (evt) => {
      console.log(evt);
    })

    let counter = 0;
    let interval = setInterval ( () => {      
      if (counter < 10) {
        console.log(counter);
        counter++;
      } else {
        clearInterval(interval)
      }
      
    }, 1000)

    setTimeout(() => {
      console.log('finished...');
    }, 3000);
  }

 


}
