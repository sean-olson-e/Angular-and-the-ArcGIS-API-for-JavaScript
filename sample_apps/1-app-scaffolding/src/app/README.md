# App Scaffolding

This sample will provides a boilerplate for standing up an Angular app that implements the ArcGIS API for JavaScript.  We leverage the Angular CLI and the [esri_loader](https://github.com/Esri/esri-loader)    

## Implementing the ArcGIS API for JavaScript

Using the ArcGIS API for JavaScript in an Angular applciation requires these dependencies: 

* [Angular Devkit](https://github.com/angular/devkit) Development tools and libraries specialized for Angular
* [ArcGIS API for JavaScript](https://developers.arcgis.com/javascript/)
* [`esri-loader`](https://github.com/Esri/esri-loader) A library that helps load the [ArcGIS API for JavaScript](https://developers.arcgis.com/javascript/) into non-Dojo applications.
* [`arcgis-js-api.d.ts`](https://github.com/Esri/jsapi-resources/tree/master/4.x/typescript) Esri TypeScript type definitions

### 1. Install `esri-loader`, Esri TypeScript types, and Angular Devkit

```
  npm install
  npm install --save esri-loader
  npm install --save @types/arcgis-js-api
  npm install --save @angular-devkit/core  // optional for this sample
  
```

### 2. Test run the app

Run this command and then navigate to `http://localhost:4200`

```

  ng serve

```


# Licensing

Copyright 2018 Esri

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

A copy of the license is available in the repository's license.txt file.
