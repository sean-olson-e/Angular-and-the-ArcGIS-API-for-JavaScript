import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  header = 'Esri Dev Summit 2018: Async Operations Using Promises';
  header_tag = 'Select a world wonder.  The selector is then disabled while the panMap method is called, which returns a promise. ' +
               ' Once the map has panned, the map component resolves the promise, and the dashboard selctor is enabled again';

  constructor() { }

  ngOnInit() {
  }

}
