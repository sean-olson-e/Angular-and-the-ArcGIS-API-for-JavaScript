import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  header = 'Esri Dev Summit 2018: Async Operations Using the Angular Event Emitter';
  header_tag = 'Select a world wonder.  The selector is then disabled while the map pans to your selection. ' +
               ' Once complete, the map component emits an event and the dashboard selctor is enabled again';

  constructor() { }

  ngOnInit() {
  }

}
