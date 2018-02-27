# Managing Asynchronous Operations using Angular Events

This sample app demonstrates a pattern for managing asynchronous operations using Angular Events.
## Overview
This app has two key components, a dashboard containing a location selector and a map. They share a simple interaction. When the user selects a location, an event is triggered that instructs the map to pan, and the selector is disabled while the map extent is repositioned. Once repositioned, the map component notifies the dashboard, so it can enable the selector.
In this case, the map component is a child of the dashboard component. This relationship allows the dashboard component class to hold a reference to the map component class. With that reference, the dashboard component class can directly invoke a method of the map component class. The map component in-turn defines a custom event that notifies the dashboard when the map has completed its operation, providing a mechanism for our asynchronous operation.

## The Dashboard Component
#### Getting a Reference to a Child Component
Getting a reference to a child-component class is done with the ```ViewChild``` module that's part of the ```@angular/core package```.  So first, import the ```ViewChild``` module along with your ```EsriMapComponent``` into the parent ```DashboardComponent``` class.
```
 import { Component, ViewChild, OnInit } from '@angular/core';
 import { EsriMapComponent } from '../esri-map/esri-map.component';
```
With the ```ViewChild``` and ```EsriMapComponent``` modules loaded into the dashboard component class, we can declare a variable, ```map```, using the ```@ViewChild``` decorator.  This variable will provide a reference to the esri-map component class.  

```
export class DashboardComponent implements OnInit {
   @ViewChild(EsriMapComponent) map: EsriMapComponent; 
	...
}
```
#### Communicating with a Child Component
Using the reference to the esri-map component, the event handler (```selectedWonder()```) is wired up to the location selector. When the user selects a location, the event handler disables the dashboard panel and calls the map's ```panMap()``` method.  The esri-map component in turn will fire a custom event, triggering the dashboard component to call its ```enablePanel()``` method.

```
  selectedWonder = (ev) => {
    // verify that a wonder is selected
    if (ev.target.value === '') {
      return;
    }

    // disable the panel
    this.disablePanel(this.sevenWonders[ev.target.value].name);

    // call the panMap method of the child map component
    this.map.panMap(this.sevenWonders[ev.target.value].coordinates);

  }
```
##### Wiring the event listener in the Dashboard Component template
The custom event fired in the map component will trigger the event handler configured in the dashboard template.  Custom event handlers are included in the child-component directive within the parent component's template:

```
  <div class="container">
    <div class="row">
  
    ...
  
      <div class="col-8">
          <app-esri-map (wonderMapped)="enablePanel()"></app-esri-map>
      </div>
    </div>
  </div>
```

## The Esri-Map Component
To create a custom event, first import the ```Output``` and ```EventEmitter``` modules into the component class

```
import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
```
Next, declare a new event emitter, using the ```@Output``` decorator

```
  @Output() wonderMapped = new EventEmitter();
```

Then from within the esri-map component class's ```panMap()``` method, call the emit() method of the custom event when the map extent is repositioned.


```
  panMap = (coordinates) => {
    this.mapView.goTo(coordinates)
    .then(() => {
      this.mapView.zoom = 18;
      setTimeout(() => {
        this.wonderMapped.emit();
      }, 2000);
    });
  }
```
### TL;DR*

1.	Import the ```ViewChild``` and child class modules into the parent component class.
2.	Create an instance variable referencing the child class.
3.	Configure an event listener in the parent component template that will be triggered by the child.
4.	From the parent component class, invoke a method in the child-component class.
5.	When ready, trigger the custom event from within the child.
6.	When the parent class's custom event listener is triggered, continue operations.

*_"too long; didn't read"_
