# Managing Map State
This sample app demonstrates a pattern for managing map state through the use of a service that stores map-state properties.

## Overview
A challenge with more complex Angular mapping apps comes with the need to maintain map state while routing.  Each time a route loads a component that contains a map, the component will (re-)initialize itself, setting the map to its original state.  So how do you maintain the state of your map?  One way is through the use of a map-state service.

This sample app walks you through creating service that will keep track of points on a map.  As the points are added to the map, they are saved to a service property simultaneously.  Every time the user routes to the map view, the component gets the previously-saved points saved in the service and adds them to the map view, effectively refreshing the map state.

## The Service Class
While an individual service can be instanced within a component, in this case we want to use a service that is independent of the component.  To create a single instance of a service class and share it across one or more components, we’ll use dependency injection.  To do this, first, create the class.  From the console run
```
  ng create service map-state
```
Then add the properties and methods that will manage an array of points
```
@Injectable()
export class MapStateService {
  private _points: __esri.Graphic[] = [];
  get points() {
    return this._points;
  }
  addPoint(point: __esri.Graphic) {
    this.points.push(point);
  }
  constructor() { }
} 
```

You're service is done.  Easy, right?

## Injecting the Service into Your Application
Using a common class instance as a service across multiple components is accomplished in Angular using Dependency Injection (DI).  Setting up DI is a two-step configuration in the application’s ```app.module.ts``` file.

First, import the class into the application module
```
import { MapStateService } from './services/map-state.service;
```
Second, add the service name to the providers property in the ngModule decorator.
```
@NgModule({
  ...
  providers: [MapStateService],
  ...
})
```
That’s it.  You are done.

## The Map Component
With the service ready to use, import the service into the map component.
```
import { MapStateService } from '../services/map-state.service';
```
Create a reference to the service instance in the component constructor.

```
constructor(private msService: MapStateService) {}
```
Finally, in the component’s map initialization, connect with the service to load existing points when the map view is created,
```
this.mapView.when(
  () => {
     if (this.msService.points.length) {
          this.mapView.graphics.addMany(this.msService.points);
      }
    },
    (err) => {
       console.log(err);
     }
  );
```
and add any new points to the service.

```
this.mapView.on('click', (event: __esri.MapViewClickEvent) => {
const pointGraphic: __esri.Graphic = new Graphic({
            ...
      });

      this.msService.addPoint(pointGraphic);
...         
 });
```

### 
TL;DR*
1.	Create a new class that will hold map-state properties
2.	Configure the App Module to inject the service class into the application as a dependency.
3.	Create component class that will use the service.
4.	Create a reference to the service in the component class’s constructor.
5.	Use the class’s getter and setters to save and restore map state.

*"too long; didn't read"
