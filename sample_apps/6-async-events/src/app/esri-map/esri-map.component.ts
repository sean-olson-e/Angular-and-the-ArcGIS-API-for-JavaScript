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

import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { loadModules } from 'esri-loader';

@Component({
  selector: 'app-esri-map',
  templateUrl: './esri-map.component.html',
  styleUrls: ['./esri-map.component.css']
})

export class EsriMapComponent implements OnInit {

  @Output() wonderMapped = new EventEmitter(); // notfies the dashboard component when the mapp is finished
  @ViewChild('mapViewNode') private viewNode: ElementRef; // needed to inject the MapView into the DOM
  mapView: __esri.MapView;

  constructor() {
  }

  panMap = (coordinates) => {
    this.mapView.goTo(coordinates)
    .then(() => {
      this.mapView.zoom = 18;
      setTimeout(() => {
        this.wonderMapped.emit();
      }, 2000);
    });
  }

  public ngOnInit() {
    // use esri-loader to load JSAPI modules
    return loadModules([
      'esri/Map',
      'esri/views/MapView',
      'esri/Graphic'
    ])
      .then(([Map, MapView, Graphic]) => {
        const map: __esri.Map = new Map({
          basemap: 'hybrid'
        });

        this.mapView = new MapView({
          container: this.viewNode.nativeElement,
          center: [-12.287, -37.114],
          zoom: 12,
          map: map
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
}
