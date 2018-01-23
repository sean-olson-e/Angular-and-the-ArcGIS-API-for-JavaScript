import { Component, OnInit } from '@angular/core';
import { ArcGIS } from '../services/arcgis.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  constructor() {
    this.require = new ArcGIS()['require'];
  }

  require;

  ngOnInit() {

    this.require(['esri/Map', 'esri/views/MapView', 'dojo/domReady!'], function(
      Map,
      MapView
    ) {

      const map = new Map({
        basemap: 'gray'
      });

      const view = new MapView({
        container: 'viewDiv',
        map: map,
        zoom: 16,
        center: [18.06, 59.34]
      });

    });
  }
}
