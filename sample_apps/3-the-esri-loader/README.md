# The esri-loader

This sample provides a boilerplate for standing up an Angular app that implements the ArcGIS API for JavaScript.  We leverage the Angular CLI and the [esri-loader](https://github.com/Esri/esri-loader).

## Overview

- The glue that holds everything together is ["Esri/esri-loader"](https://github.com/Esri/esri-loader).

  > "A tiny library to help load ArcGIS API for JavaScript modules in non-Dojo applications"

  ```typescript
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

  - `loadModulues` method that you `import` as needed

    ```typescript
    import { loadModules } from 'esri-loader';
    ```

  - `loadModulues` method dynamically injects an Esri `<script>` tag onto the page

- Why?

  - Provides a reliable way to load Esri modules using Dojo's AMD loader

- You benefit from getting to:

  - use Angular tooling

  - improve initial app load performance

  - control which Esri modules you want, à la carte

## Background info on this sample code

This sample app was created following the instructions here: https://github.com/Esri/angular-cli-esri-map.

Please spend some time getting comfortable with those instructions.
