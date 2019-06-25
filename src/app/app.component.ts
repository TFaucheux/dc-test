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
  title = 'AppComponent title works!';

  constructor() {
  }

  ngAfterViewInit() {
  }

  ngOnInit(): void {
  }
}
