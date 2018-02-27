# The esri-loader

This sample provides a boilerplate for standing up an Angular app that implements the ArcGIS API for JavaScript.  We leverage the Angular CLI and the [esri-loader](https://github.com/Esri/esri-loader).

## Overview

- The glue that holds everything together is ["Esri/esri-loader"](https://github.com/Esri/esri-loader).

  > "A tiny library to help load ArcGIS API for JavaScript modules in non-Dojo applications"

  ```ts
  /*
    ANGULAR GALAXY AND COLD VACUUM OF SPACE OUT HERE!
  */

  import { loadModules } from 'esri-loader';

  // ... later in your Angular component code ...

  loadModules([
    'esri/Map',
    'esri/views/MapView',
    'esri/layers/FeatureLayer',
    'esri/Graphic'
    // ... and any other Esri modules you might need
  ]).then(([
    EsriMap,
    EsriMapView,
    FeatureLayer,
    Graphic
  ]) => {
    /*
      ESRI PLANET WITH ATMOSPHERE INSIDE HERE!
    */

    // for example you could construct a simple MapView
    // or recreate any demo from https://js.arcgis.com
  });

  /*
    ANGULAR GALAXY AND COLD VACUUM OF SPACE OUT HERE!
  */
  ```

- This brings Esri **WITHIN** Angular

- Which ultimately means Dojo **INSIDE OF** Angular

- How?

  - ES/TS module with `loadModulues` method that you `import` as needed.

  - It dynamically injects an ArcGIS for JavaScript API `<script>` tag onto the page.

  - You tell `loadModules` which Esri modules you want, à la carte.

- Why?

  > The only reliable way to load ArcGIS API for JavaScript modules is using Dojo's AMD loader.

- You benefit from getting to:

  - use Angular tooling

  - improve initial app load performance

  - control exactly when to load and use Esri modules

## Background info on this sample code

This sample app was created following the instructions here: https://github.com/Esri/angular-cli-esri-map.

Please spend some time getting comfortable with those instructions.

### TL;DR*

1. `ng new YOUR-APP`

2. `cd YOUR-APP`

3. `npm install --save esri-loader`

4. `ng generate component esri-map`

5. Copy and paste mapping component files from https://github.com/Esri/angular-cli-esri-map

6. Add `<app-esri-map></app-esri-map>` to `app.component.html` file

7. `ng serve` or `ng build --base-href ./`

*_"too long; didn't read"_
