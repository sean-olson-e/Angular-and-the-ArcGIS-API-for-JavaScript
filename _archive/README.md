# *Building Web Applications with ArcGIS API for the JavaScript, using the Angular CLI*

This repository was developed to support the *Esri Dev Summit 2018* presentation of similar name.  In the [samples](https://github.com/sean-olson-esri/2018_dev_summit_arcgis_api_angular_cli/tree/master/samples) directory you will find a number of implementations of the ArcGIS API for JavaScript in Angular (2+) applications, using the [`esri-loader`](https://github.com/Esri/esri-loader).

### In this Repository

This repository contains multiple, standalone Angular application samples that share a top-level `.angular-cli.json`* and `package.json`. This saves us from having many individual Angular CLI configurations and just as many repeats of `node_modules` dependencies. The catch here is that we will have more verbose `ng ...` commands to ensure that we are pointing the Angular CLI to an appropriate sample application directory.

*not to sidetrack you, but if you're curious: https://github.com/angular/angular-cli/wiki/stories-multiple-apps

#### Getting started

_TODO: update this section with info on how we got here in the first place? i.e. global angular cli, esri-loader, esri types, angular devkit?_

```bash
# one-time only when cloning this repo
npm install -g @angular/cli
npm install

# each time you want to begin serving/watching sample 1 for local development
ng serve --app 1-app-scaffolding

# each time you want to test sample 1
ng test --config ./samples/1-app-scaffolding/karma.conf.js

# each time you want to build sample 1
ng build --app 1-app-scaffolding --base-href ./

# TODO: streamline documenting all the ng commands for
# as many sample apps we will end up having
```

_TODO: update this section_

Each of the implementations in the ```samples``` directory is accompanied by a README file that will walk you through the given implementation. Here is what you'll find there.

* [1-app-scaffolding](https://github.com/sean-olson-esri/2018_dev_summit_arcgis_api_angular_cli/tree/master/samples/1-app-scaffolding) -- _description goes here._
* [2-more-app-scaffolding](https://github.com/sean-olson-esri/2018_dev_summit_arcgis_api_angular_cli/tree/master/samples/2-more-app-scaffolding) -- _description goes here._
* and so on...

### Licensing

Copyright 2018 Esri

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

A copy of the license is available in the repository's license.txt file.
