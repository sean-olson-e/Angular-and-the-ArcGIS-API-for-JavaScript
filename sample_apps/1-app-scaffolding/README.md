# App Scaffolding

This sample provides a boilerplate for standing up an Angular app that implements the ArcGIS API for JavaScript.  We leverage the Angular CLI and the [esri-loader](https://github.com/Esri/esri-loader).

## Overview

- Quick start:

  ```bash
  npm install
  ng serve
  # or: ng build --base-href ./
  ```

- Building blocks:

  - Angular CLI

  - "esri-loader"

  - custom demo files:

    - `esri-map.component.ts`

    - `esri-map.component.html`

    - `esri-map.component.css`

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
