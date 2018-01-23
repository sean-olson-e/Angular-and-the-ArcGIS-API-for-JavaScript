import { Injectable } from '@angular/core';

@Injectable()
export class ArcGIS {

  constructor() {
    this.define = window['_arc_gis']['define'];
    this.dijit = window['_arc_gis']['dijit'];
    this.dojo = window['_arc_gis']['dojo'];
    this.dojox = window['_arc_gis']['dojox'];
    this.require = window['_arc_gis']['require'];
   }

  _define;
  _dijit;
  _dojo;
  _dojox;
  _require;

  get define () {
    return this._define;
  }
  set define (val) {
    this._define = val;
  }
  get dijit () {
    return this._dijit;
  }
  set dijit (val) {
    this._dijit = val;
  }
  get dojo () {
    return this._dojo;
  }
  set dojo (val) {
    this._dojo = val;
  }
  get dojox () {
    return this._dojox;
  }
  set dojox (val) {
    this._dojox = val;
  }
  get require () {
    return this._require;
  }
  set require (val) {
    this._require = val;
  }
}
