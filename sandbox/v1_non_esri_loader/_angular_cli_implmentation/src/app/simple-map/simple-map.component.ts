import { Component, OnInit } from '@angular/core';
import { ArcGIS } from '../services/arcgis.service';

@Component({
  selector: 'app-simple-map',
  templateUrl: './simple-map.component.html',
  styleUrls: ['./simple-map.component.css']
})
export class SimpleMapComponent implements OnInit {
  constructor() {
    const ag = new ArcGIS();
    this.require = ag.require;
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
