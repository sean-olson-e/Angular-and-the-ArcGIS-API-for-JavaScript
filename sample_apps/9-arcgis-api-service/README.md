# Create a map using a service 

This sample app demonstrates a pattern for outsourcing your map creation code to an Angular service.

## Overview
In this app, we essentially refactor sample 2 to remove the map creation code and we'll move that into a service.

We create a basic service that wraps the map creation code in a promise that we'll return to the component.

## The Service Class
To set up a class you can either use `ng generate service esri-map.service` or you can copy and paste code from this sample. In this service, we have also added in TypeScript typings, so it will look a little different than sample 2. 

First we need to import our modules:

```
  import { loadModules } from 'esri-loader';
  import esri = __esri;

```

Second, we need to create a new `loadMap()` method that will be exposed by the Class. Note that in the constructor of the method we inject our basemap type, the map center and a reference to the `div` where we will create the map.

```

  loadMap(basemap: String, center: Array<number>, zoom: Number, mapContainer: ElementRef) { }

```

Third, remove the `loadModules()` method from `esri-map.component.ts` and wrap it in a promise inside our new Class:

```
  const promise = new Promise((resolve, reject) => {  
    // loadModules() code goes here
    
    
    return promise; // Don't forget to return the promise :-)
  }

```


## Injecting the Service into Your Application
 Using a common class instance as a service across multiple components is accomplished in Angular using Dependency Injection (DI).  This is accomplished through a simple configuration in the application’s app.module.ts file.
 
 First, import the class into the application module.
 ```
 import { EsriMapService } from './services/esri-map.service';
 ```
 Second, add the service name to the providers property in the ngModule decorator.
 
 ```
    @NgModule({
      ...
      providers: [EsriMapService],
      ...
    })
 ```
 That’s it.  You are done.
 
 ## The Map Component
 Subscribing to the service in the map component is a three-step process.  First, import the service.
 ```
  import { EsriMapService } from '../services/esri-map.service';
 ```
 Next, create a reference to the service in the control-panel component class’s constructor:
 
 ```
  constructor(private esriMapService: EsriMapService) { }
 ```
 Finally, declare a subscription instance in the component class’s initialization method.  Call the `esriMapService.loadMap()` method that we just created passing in the appropriate attributes into the constructor.
 
In the Promise returned by the `esriMapService.loadMap()` method we'll place the `mapLoaded` event emitter
 
 ```
  public ngOnInit() {

    this.esriMapService.loadMap(this._basemap, this._center, this._zoom, this.mapViewEl)
      .then(() => {
        this.mapLoaded.emit(true);
      });
  } // ngOnInit
 ```
 
### TL;DR*
1.	Create a service class to create our map
2.	Define the map within the service class.
3.	Configure the App Module to inject the service class into the application as a dependency.
4.	Create component class that will use the service.
5.	Create a reference to the service in the component class’s constructor.
6.	Subscribe to map service in the component class’s initialization method.
*"too long; didn't read"
