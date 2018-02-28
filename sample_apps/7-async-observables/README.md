# Managing Asynchronous Operations using RxJS Observables

This sample app demonstrates a pattern for managing asynchronous RxJS Observables.

## Overview
This app has two key components, a control panel containing a location selector and a map component. These components communicate through a shared service, used to manage their asynchronous operations.

When the user selects a location, the control panel component communicates with the map service notifying it of the request.  The service, in turn, notifies all subscribed observers of the request.  The map component, which is subscribed, hears the request and repositions the map extent based on the coordinates supplied by the service.

Once the map is repositioned, the component alerts the map service that it’s done.  The service now notifies all subscribed observers that the action is complete.  In this case, it’s the control panel component that is listening.  It then will resume its operation.

This observer/observable pattern provides a mechanism for our asynchronous operation.

## The Service Class
To set up a class to communicate using RxJS observables, first import RxJS into the class

```
import { Subject } from 'rxjs/Subject';
```

Next, defined the observable subjects within the class.
```
  panRequest = new Subject<void>();
  panComplete = new Subject<void>();
```
Finally, script the class methods that will call the next() methods, notifying the subscribed observers that an event has occurred.
```
  panToWonder = (wonder_coordinates) => {
    this.wonderCoordinates = wonder_coordinates;
    this.panRequest.next();
  }

  panToWonderComplete = () => {
    this.panComplete.next();
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
 
 ## The Control Panel Component
 Subscribing to the observables in the map service is a three-step process.  First, import the service.
 ```
  import { EsriMapService } from '../services/esri-map.service';
 ```
 Next, create a reference to the service in the control-panel component class’s constructor:
 
 ```
  constructor(private mapService: EsriMapService) { }
 ```
 Finally, declare a subscription instance in the control-panel component class’s initialization method.  Pass the callback method you want to the subscription method.
 ```
      ngOnInit() {
        this.panCompleteSubscription = this.mapService.panComplete.subscribe(() => {
          this.enablePanel();
        });
      }
 ```
 ## The Map Component
 
 The map component follows the same three-step process, but subscribes to a different observable. First, import the service.
 ```
 import { EsriMapService } from '../services/esri-map.service';
 ```
 Next, create a reference to the service in the control-panel component class’s constructor:
 
 ```
 constructor(private mapService: EsriMapService) { }
 ```
 Finally, declare a subscription instance in the control-panel component class’s initialization method.  Pass the callback method you want to the subscription method.
 ```
    ngOnInit() {
      this.panRequestSubscription = this.mapService.panRequest.subscribe(() => {
          this.panMap(this.mapService.wonderCoordinates);
    });
  ```
### TL;DR*
1.	Create a service class with RxJS included
2.	Define subscription observables within the service class.
3.	Configure the App Module to inject the service class into the application as a dependency.
4.	Create component class that will use the service.
5.	Create a reference to the service in the component class’s constructor.
6.	Subscribe to service observables in the component class’s initialization method.
*"too long; didn't read"
