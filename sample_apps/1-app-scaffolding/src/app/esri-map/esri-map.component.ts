/*
  Copyright 2018 Esri
  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { loadModules } from 'esri-loader';

@Component({
  selector: 'app-esri-map',
  templateUrl: './esri-map.component.html',
  styleUrls: ['./esri-map.component.css']
})

export class EsriMapComponent implements OnInit {

  // this is needed to be able to create the MapView at the DOM element in this component
  @ViewChild('mapViewNode') private mapViewEl: ElementRef;

  constructor() { }

  ngOnInit() {
    loadModules([
      'esri/Map',
      'esri/views/MapView'
    ])
      .then(([EsriMap, EsriMapView]) => {
        const map = new EsriMap({
          basemap: 'streets'
        });

        const mapView = new EsriMapView({
          container: this.mapViewEl.nativeElement,
          center: [0.1278, 51.5074],
          zoom: 10,
          map: map
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

}
