# Types for ArcGIS API

This sample provides a boilerplate for standing up an Angular app that implements the ArcGIS API for JavaScript.  We leverage the Angular CLI and the [esri-loader](https://github.com/Esri/esri-loader).

## Overview

- [Esri provides type definitions](https://github.com/Esri/jsapi-resources/) for the ArcGIS API for JavaScript

- For Esri v4.x, install them with `npm install --save @types/arcgis-js-api`

- Types are available through global `__esri` namespace **for Esri v4.x**

  - We recommend renaming to `esri` with `import esri = __esri;`

  ```ts
  const map = new MapView({ /* zoom, center, etc. */ });

  // versus

  const map: esri.MapView = new MapView({ /* zoom, center, etc. */ });
  ```

  ```ts
  const arrayOfGraphics = [];
  const myGraphic = new Graphic({ /* geometry, symbol, etc. */ });
  arrayOfGraphics.push(myGraphic)

  // versus

  const arrayOfGraphics: esri.Graphic[] = [];
  const myGraphic: esri.Graphic = new Graphic({ /* geometry, symbol, etc. */ });
  arrayOfGraphics.push(myGraphic);
  ```

- More info at https://github.com/Esri/jsapi-resources/

## Background info on this sample code

This sample app was created following the instructions here: https://github.com/Esri/angular-cli-esri-map.

Please spend some time getting comfortable with those instructions.

### TL;DR*

1. `ng new YOUR-APP`

2. `cd YOUR-APP`

3. `npm install --save esri-loader` and `npm install --save @types/arcgis-js-api`

4. `ng generate component esri-map`

5. Copy and paste mapping component files from https://github.com/Esri/angular-cli-esri-map

6. Add `<app-esri-map></app-esri-map>` to `app.component.html` file

7. `ng serve` or `ng build --base-href ./`

*_"too long; didn't read"_
