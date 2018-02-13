import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  header = 'Esri Dev Summit 2018: Implementing ArcGIS API for JavaScript and Angular CLI';
  header_tag = 'Managing Map State with Services: click map to set point graphics persisted in map state';

  constructor() { }

  ngOnInit() {
  }

}
