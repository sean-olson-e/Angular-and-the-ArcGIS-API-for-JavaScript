# 2018 Esri Developer Summit: Building Web Applications using the ArcGIS API for JavaScript and the Angular CLI

In this repository you will find code samples and support materials that will walk you through the 
implementation of ArcGIS API for JavaScript in Angular (2+) applications 

## Using this Repository
In addition to the simple *kick-start* implementation in the master branch, you will find more
complex samples in the other branches of this repository.    

### Branches: 
* master -- simple map application

### Cloning this Repository
To clone this repository with all of its branches, run these commands from your console.
````
git clone --bare https://github.com/sean-olson/2018_esri_dev_summit_angular_cli.git
git config --bool core.bare false
git reset --hard
````

## Creating an Angular Application Using the CLI 
The Angular CLI makes it easy to create an application that already works, right out of the box. It already follows our best practices, and it's really simple to get started.

1. Make sure you have Angular CLI installed. See the instructions [here](https://github.com/angular/angular-cli).

2. Generate your Angular project

```
  ng new angular-cli-esri-app
  cd angular-cli-esri-app
  ng serve
```

  Navigate to http://localhost:4200/ and the basic app should run just fine. The app will automatically reload if you change any of the source files.

## Implementing the ArcGIS API for JavaScript

Using the ArcGIS API for JavaScript in an Angular applciation requires these dependencies: 

* [Angular Devkit](https://github.com/angular/devkit) Development tools and libraries specialized for Angular
* [ArcGIS API for JavaScript](https://developers.arcgis.com/javascript/)
* [`esri-loader`](https://github.com/Esri/esri-loader) A library that helps load the [ArcGIS API for JavaScript](https://developers.arcgis.com/javascript/) into non-Dojo applications.
* [`arcgis-js-api.d.ts`](https://github.com/Esri/jsapi-resources/tree/master/4.x/typescript) Esri TypeScript type definitions

### 1. Install `esri-loader`, Esri TypeScript types, and Angular Devkit

```
  npm install --save esri-loader
  npm install --save @types/arcgis-js-api
  npm install --save @angular-devkit/core
```

### 2. Inlcude the TypeScript definitions in the TypeScript application config files:
* Add `"types": ["arcgis-js-api"]` to `tsconfig.app.json`

* Add  `"types": ["arcgis-js-api"]` to `tsconfig.spec.json`

[`esri-loader`](https://github.com/Esri/esri-loader#usage) is a low level service needed to load and use ArcGIS modules (v3.x or v4.x) in non-Dojo applications.

And, the ArcGIS JavaScript TypeScript type definitions can be found [here](https://github.com/Esri/jsapi-resources/tree/master/4.x/typescript).

### 3. Generate a simple mapping component

```
  ng generate component esri-map
```

### 4. Import the Esri Loader, ViewChild and ElementRef modules into your Component
This generic code sample provides an quick guide to building out a basic mapping component. In this example, the 
`@ViewChild` directive takes the argument `mapViewNode` which targets the div in the component template where
the map will be rendered, e.g., `<div #mapViewNode></div>`  

```
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { loadModules } from 'esri-loader';

...

export class YourMapComponent implements OnInit {

  public mapView: __esri.MapView;

  // this is needed to be able to create the MapView at the DOM element in this component
  @ViewChild('mapViewNode') private mapViewEl: ElementRef;

  constructor() { }

  public ngOnInit() {

    return loadModules([
      'esri/Map',
      'esri/views/MapView',
      ...
    ]).then(([Map, MapView, ...]) => {

      const map: __esri.Map = new Map({
        basemap: 'hybrid'
      });

      this.mapView = new MapView({
        container: this.mapViewEl.nativeElement,
        map: map,
        ...
      });
    })
    .catch(err => {
      console.log(err);
    });
  }
}
```



# Licensing

Copyright 2017 Esri

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

A copy of the license is available in the repository's license.txt file.
