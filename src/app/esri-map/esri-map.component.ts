import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { loadModules } from 'esri-loader';
import esri = __esri;

@Component({
  selector: 'app-esri-map',
  templateUrl: './esri-map.component.html',
  styleUrls: ['./esri-map.component.css']
})

export class EsriMapComponent implements OnInit {

  public mapView: esri.MapView;

  // this is needed to be able to create the MapView at the DOM element in this component
  @ViewChild('mapViewNode') private mapViewEl: ElementRef;

  constructor() { }

  public ngOnInit() {

    return loadModules([
      'esri/Map',
      'esri/views/MapView'
    ]).then(([Map, MapView]) => {

      const map: esri.Map = new Map({
        basemap: 'hybrid'
      });

      this.mapView = new MapView({
        container: this.mapViewEl.nativeElement,
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
