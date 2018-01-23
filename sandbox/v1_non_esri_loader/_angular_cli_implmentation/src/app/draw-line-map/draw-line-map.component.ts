import { Component, OnInit } from '@angular/core';
import { ArcGIS } from '../services/arcgis.service';

@Component({
  selector: 'app-draw-line-map',
  templateUrl: './draw-line-map.component.html',
  styleUrls: ['./draw-line-map.component.css']
})
export class DrawLineMapComponent implements OnInit {
  constructor() {
    const ag = new ArcGIS();
    this.require = ag.require;
  }

  require: any;
  map: any;
  view: any;
  draw: any;
  Graphic: any;
  Polyline: any;
  geometryEngine: any;

  enableCreateLine() {

    const self = this;

    // creates and returns an instance of PolyLineDrawAction
    const action = this.draw.create('polyline');

    // focus the view to activate keyboard shortcuts for sketching
    this.view.focus();

    // listen to vertex-add event on the polyline draw action
    action.on('vertex-add', updateVertices);

    // listen to vertex-remove event on the polyline draw action
    action.on('vertex-remove', updateVertices);

    // listen to cursor-update event on the polyline draw action
    action.on('cursor-update', createGraphic);

    // listen to draw-complete event on the polyline draw action
    action.on('draw-complete', updateVertices);

      // This function is called from the 'vertex-add' and 'vertex-remove'
      function updateVertices(evt) {
        // create a polyline from returned vertices
        const result = createGraphic(evt);

        // if the last vertex is making the line intersects itself,
        // prevent 'vertex-add' or 'vertex-remove' from firing
        if (result.selfIntersects) {
          evt.preventDefault();
        }
      }

      // create a new graphic presenting the polyline that is being drawn on the view
      function createGraphic(evt) {
        const vertices = evt.vertices;
        self.view.graphics.removeAll();

        // a graphic representing the polyline that is being drawn
        const graphic = new self.Graphic({
          geometry: new self.Polyline({
            paths: vertices,
            spatialReference: self.view.spatialReference
          }),
          symbol: {
            type: 'simple-line', // autocasts as new SimpleFillSymbol
            color: [4, 90, 141],
            width: 4,
            cap: 'round',
            join: 'round'
          }
        });

        // check the polyline intersects itself.
        const intersectingFeature = getIntersectingFeature(graphic.geometry);

        // Add a new graphic for the intersecting segment.
        if (intersectingFeature) {
          self.view.graphics.addMany([graphic, intersectingFeature]);

          // Just add the graphic representing the polyline if no intersection
        } else {
          self.view.graphics.add(graphic);
        }

        // return the graphic and intersectingSegment
        return {
          graphic: graphic,
          selfIntersects: intersectingFeature
        };
      }

      // function that checks if the line intersects itself
      function isSelfIntersecting(polyline) {
        if (polyline.paths[0].length < 3) {
          return false;
        }
        const line = polyline.clone();

        // get the last segment from the polyline that is being drawn
        const lastSegment = getLastSegment(polyline);
        line.removePoint(0, line.paths[0].length - 1);

        // returns true if the line intersects itself, false otherwise
        return self.geometryEngine.crosses(lastSegment, line);
      }

      // Checks if the line intersects itself. If yes, changes the last
      // segment's symbol giving a visual feedback to the user.
      function getIntersectingFeature(polyline) {
        if (isSelfIntersecting(polyline)) {
          return new self.Graphic({
            geometry: getLastSegment(polyline),
            symbol: {
              type: 'simple-line', // autocasts as new SimpleLineSymbol
              style: 'short-dot',
              width: 3.5,
              color: 'yellow'
            }
          });
        }
        return null;
      }

      // Get the last segment of the polyline that is being drawn
      function getLastSegment(polyline) {
        const line = polyline.clone();
        const lastXYPoint = line.removePoint(0, line.paths[0].length - 1);
        const existingLineFinalPoint = line.getPoint(0, line.paths[0].length - 1);

        return new self.Polyline({
          spatialReference: self.view.spatialReference,
          hasZ: false,
          paths: [
            [
              [existingLineFinalPoint.x, existingLineFinalPoint.y],
              [lastXYPoint.x, lastXYPoint.y]
            ]
          ]
        });
      }
  }

  ngOnInit() {

    const self = this;

    this.require(
      [
        'esri/Map',
        'esri/views/MapView',
        'esri/views/2d/draw/Draw',
        'esri/Graphic',
        'esri/geometry/Polyline',
        'esri/geometry/geometryEngine',

        'dojo/domReady!'
      ],
      function(Map, MapView, Draw, Graphic, Polyline, geometryEngine) {

        self.Graphic = Graphic;
        self.Polyline = Polyline;
        self.geometryEngine = geometryEngine;

        self.map = new Map({
          basemap: 'gray'
        });

        self.view = new MapView({
          container: 'viewDiv',
          map: self.map,
          zoom: 16,
          center: [18.06, 59.34]
        });

        // add the button for the draw tool
        self.view.ui.add('line-button', 'top-left');

        self.view.then(function(evt) {
          self.draw = new Draw({
            view: self.view
          });
        });
      }
    );

    // this.require([
    //   'esri/Map',
    //   'esri/views/MapView',
    //   'esri/views/2d/draw/Draw',
    //   'esri/Graphic',
    //   'esri/geometry/Polyline',
    //   'esri/geometry/geometryEngine',

    //   'dojo/domReady!'
    // ], function(
    //   Map, MapView,
    //   Draw, Graphic,
    //   Polyline, geometryEngine
    // ) {
    //   const map = new Map({
    //     basemap: 'gray'
    //   });

    //   const view = new MapView({
    //     container: 'viewDiv',
    //     map: map,
    //     zoom: 16,
    //     center: [18.06, 59.34]
    //   });

    //   // add the button for the draw tool
    //   view.ui.add('line-button', 'top-left');

    //   view.then(function(evt) {
    //     const draw = new Draw({
    //       view: view
    //     });

    //     // ********************
    //     // draw polyline button
    //     // ********************
    //     const drawLineButton = document.getElementById('line-button');
    //     drawLineButton.onclick = function() {
    //       view.graphics.removeAll();
    //       enableCreateLine(draw, view);
    //     };
    //   });

    //   function enableCreateLine(draw, map_view) {
    //     // creates and returns an instance of PolyLineDrawAction
    //     const action = draw.create('polyline');

    //     // focus the view to activate keyboard shortcuts for sketching
    //     map_view.focus();

    //     // listen to vertex-add event on the polyline draw action
    //     action.on('vertex-add', updateVertices);

    //     // listen to vertex-remove event on the polyline draw action
    //     action.on('vertex-remove', updateVertices);

    //     // listen to cursor-update event on the polyline draw action
    //     action.on('cursor-update', createGraphic);

    //     // listen to draw-complete event on the polyline draw action
    //     action.on('draw-complete', updateVertices);

    //   }

    //   // This function is called from the 'vertex-add' and 'vertex-remove'
    //   // events. Checks if the last vertex is making the line intersect itself.
    //   function updateVertices(evt) {
    //     // create a polyline from returned vertices
    //     const result = createGraphic(evt);

    //     // if the last vertex is making the line intersects itself,
    //     // prevent 'vertex-add' or 'vertex-remove' from firing
    //     if (result.selfIntersects) {
    //       evt.preventDefault();
    //     }
    //   }

    //   // create a new graphic presenting the polyline that is being drawn on the view
    //   function createGraphic(evt) {
    //     const vertices = evt.vertices;
    //     view.graphics.removeAll();

    //     // a graphic representing the polyline that is being drawn
    //     const graphic = new Graphic({
    //       geometry: new Polyline({
    //         paths: vertices,
    //         spatialReference: view.spatialReference
    //       }),
    //       symbol: {
    //         type: 'simple-line', // autocasts as new SimpleFillSymbol
    //         color: [4, 90, 141],
    //         width: 4,
    //         cap: 'round',
    //         join: 'round'
    //       }
    //     });

    //     // check the polyline intersects itself.
    //     const intersectingFeature = getIntersectingFeature(graphic.geometry);

    //     // Add a new graphic for the intersecting segment.
    //     if (intersectingFeature) {
    //       view.graphics.addMany([graphic, intersectingFeature]);

    //       // Just add the graphic representing the polyline if no intersection
    //     } else {
    //       view.graphics.add(graphic);
    //     }

    //     // return the graphic and intersectingSegment
    //     return {
    //       graphic: graphic,
    //       selfIntersects: intersectingFeature
    //     };
    //   }

    //   // function that checks if the line intersects itself
    //   function isSelfIntersecting(polyline) {
    //     if (polyline.paths[0].length < 3) {
    //       return false;
    //     }
    //     const line = polyline.clone();

    //     // get the last segment from the polyline that is being drawn
    //     const lastSegment = getLastSegment(polyline);
    //     line.removePoint(0, line.paths[0].length - 1);

    //     // returns true if the line intersects itself, false otherwise
    //     return geometryEngine.crosses(lastSegment, line);
    //   }

    //   // Checks if the line intersects itself. If yes, changes the last
    //   // segment's symbol giving a visual feedback to the user.
    //   function getIntersectingFeature(polyline) {
    //     if (isSelfIntersecting(polyline)) {
    //       return new Graphic({
    //         geometry: getLastSegment(polyline),
    //         symbol: {
    //           type: 'simple-line', // autocasts as new SimpleLineSymbol
    //           style: 'short-dot',
    //           width: 3.5,
    //           color: 'yellow'
    //         }
    //       });
    //     }
    //     return null;
    //   }

    //   // Get the last segment of the polyline that is being drawn
    //   function getLastSegment(polyline) {
    //     const line = polyline.clone();
    //     const lastXYPoint = line.removePoint(0, line.paths[0].length - 1);
    //     const existingLineFinalPoint = line.getPoint(0, line.paths[0].length -
    //       1);

    //     return new Polyline({
    //       spatialReference: view.spatialReference,
    //       hasZ: false,
    //       paths: [
    //         [
    //           [existingLineFinalPoint.x, existingLineFinalPoint.y],
    //           [lastXYPoint.x, lastXYPoint.y]
    //         ]
    //       ]
    //     });
    //   }
    // });
  }
}
