import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  header = 'Esri Dev Summit 2018: Async Operations Using RxJS Observables';
  header_tag = 'Select a world wonder.  The selector is then disabled while the map pans to your selection. ' +
               ' Once complete, the map component notidies the service.  The service in turn then notifies ' +
               'all subscribed observers that the map is finished panning.';

  constructor() { }

  ngOnInit() {
  }

}
