# angular-cli-esri

This tutorial shows you how to integrate the [ArcGIS API for JavaScript](https://developers.arcgis.com/javascript), which is an enterprise geospatial API, using [Angular CLI](https://github.com/angular/angular-cli).


## Dependencies

This repo has the following dependencies
* [Angular CLI](https://github.com/angular/angular-cli)
* [`esri-loader`](https://github.com/Esri/esri-loader)
* [`arcgis-js-api.d.ts`](https://github.com/Esri/jsapi-resources/tree/master/4.x/typescript) Esri TypeScript type definitions
* [ArcGIS API for JavaScript](https://developers.arcgis.com/javascript/)

## Clone or download this repo

```
  git clone https://github.com/andygup/angular-cli-esri.git
```

## Install Angular CLI

1. Make sure you have Angular CLI installed. See the instructions here: https://github.com/angular/angular-cli

2. Generate your Angular project

```
  ng new angular-cli-esri-app
  cd angular-cli-esri-app
  ng serve
```

  Navigate to http://localhost:4200/ and the basic app should run just fine. The app will automatically reload if you change any of the source files.



## Install `esri-loader` and the Esri TypeScript types

```
  npm install --save esri-loader
  npm install --save @types/arcgis-js-api
```

[`esri-loader`](https://github.com/Esri/esri-loader#usage) is a low level service needed to load and use ArcGIS modules (v3.x or v4.x) in non-Dojo applications.

And, the ArcGIS JavaScript TypeScript type definitions can be found [here](https://github.com/Esri/jsapi-resources/tree/master/4.x/typescript).

## Generate the scaffolding for your mapping component

```
  ng generate component esri-map
```

1. Add `"types": ["arcgis-js-api"]` to `tsconfig.app.json`

2. Add  `"types": ["arcgis-js-api"]` to `tsconfig.spec.json`

3. Copy the contents of this repo into the `angular-esri-cli-app/src/app/esri-map` directory

4. Add the following code to the bottom of the `app.component.html` file

```
  <app-esri-map></app-esri-map>
```

## Make sure the mapping app runs

Now run the following command and you should see the map appear at the bottom of the page

```
  ng serve
```

## Finish writing the test spec

In `app.component.spec.ts` import `EsriMapComponent` and add it to the declarations. You should have something that looks like this

```
  import { TestBed, async } from '@angular/core/testing';
  import { AppComponent } from './app.component';
  import {EsriMapComponent} from './esri-map/esri-map.component';
  
  describe('AppComponent', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          AppComponent,
          EsriMapComponent
        ],
      }).compileComponents();
    }));
    it('should create the app', async(() => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app).toBeTruthy();
    }));
    it(`should have as title 'app'`, async(() => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app.title).toEqual('app');
    }));
    it('should render title in a h1 tag', async(() => {
      const fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!');
    }));
  });
```

Now lets see if the test spec passes

```
  ng test
```

# Contributing

Esri welcomes contributions from anyone and everyone. Please see our [guidelines for contributing](https://github.com/esri/contributing).

# Licensing

Copyright 2017 Esri

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

A copy of the license is available in the repository's license.txt file.
