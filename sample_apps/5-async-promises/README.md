# Managing Asynchronous Operations using Promises

This sample app demonstrates a pattern for managing asynchronous operations using ES6 Promises. 
## Overview
This app has two key components, a dashboard containing a location selector and a map.  They share a simple interaction.  When the user selects a location, an event is triggered that instructs the map to pan, and the selector is disabled while the map extent is repositioned. Once repositioned, the map component notifies the dashboard, so it can enable the selector. 

In this case, **the map component is a child of the dashboard component**.  This relationship allows the dashboard component class to hold a reference to the map component class.  With that reference, the dashboard component class can directly invoke a method of the map component class.  The map component class then returns an ES6 Promise to the dashboard, providing a mechanism for our asynchronous operation. 

## The Dashboard Component
#### Getting a Reference to a Child Component
Getting a reference to a child-component class is done with the ```ViewChild``` module that’s part of the ```@angular/core package```.  So first, import the ```ViewChild``` module along with your ```EsriMapComponent``` into the parent ```DashboardComponent``` class.
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
Using the reference to the esri-map component, the event handler (```selectedWonder()```) is wired up to the location selector. When the user selects a location, the event handler disables the dashboard panel, calls the map’s ```panMap()``` method which returns an ES6 Promise.  Once the promise is resolved, the dashboard panel is enabled.

```
selectedWonder = (ev) => {

  // disable the panel
  this.disablePanel(this.sevenWonders[ev.target.value].name);

  // call the panMap method of the child map component
  this.map.panMap(this.sevenWonders[ev.target.value].coordinates)
    .then(() => {
      this.enablePanel();
    })
		
}
```
## The Esri-Map Component
The esri-map component class shown here, shows the exposed method, ```panMap()```, that returns a promise to the caller.  To make the delay more pronounced, a ```setTimeOut()``` is used to delay the resolution of the promise.

```
  panMap = (coordinates) => {
    return new Promise((resolve, reject) => {
      this.mapView.goTo(coordinates)
      .then(() => {
        this.mapView.zoom = 18;
        setTimeout(() => {
          resolve();
        }, 2000);
      }).catch((err) => {
        reject(err);
      });
    });
```
### TL;DR*

1. Import the ```ViewChild``` and child class modules into the parent component class.
2. Create an instance variable of the child class.
3. From the parent component class, invoke a method in the child component class that will return a promise.
4. When ready, resolve the promise in the child class.
5. When the parent class’s promise is resolved, continue operation 

*_"too long; didn't read"_
