import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { loadModules } from 'esri-loader';

@Component({
  selector: 'app-esri-map',
  templateUrl: './esri-map.component.html',
  styleUrls: ['./esri-map.component.css']
})

export class EsriMapComponent implements OnInit {

  @ViewChild('mapViewNode') private viewNode: ElementRef; // needed to inject the MapView into the DOM
  mapView: __esri.MapView;

  constructor() {
  }

  panMap = (coordinates) => {
    return new Promise((resolve, reject) => {
      this.mapView.goTo(coordinates)
      .then(() => {
        this.mapView.zoom = 18;
        setTimeout(() => {
          resolve();
        }, 2000);
      }).catch((err) => {
        reject(err);
      });
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
