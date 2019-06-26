import {Component, OnInit, AfterViewInit} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./css/font-awesome.min.css',
              './reset.css',
              './app.css',
              './app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'My title about whatever this is.';

  constructor() {
  }

  ngAfterViewInit() {
  }

  ngOnInit(): void {
  }
}
