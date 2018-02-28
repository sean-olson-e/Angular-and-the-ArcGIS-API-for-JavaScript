/*
  Copyright 2018 Esri
  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

import { Component, ViewChild, OnInit } from '@angular/core';
import { EsriMapComponent } from '../esri-map/esri-map.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChild(EsriMapComponent) map: EsriMapComponent; // needed to reference the child map component

  sevenWonders = [
    {id: 0, name: 'Great Wall of China', coordinates: [117.23, 40.68]},
    {id: 1, name: 'Petra', coordinates: [35.44194444, 30.32861111]},
    {id: 2, name: 'Christ the Redeemer', coordinates: [-43.210556, -22.951944]},
    {id: 3, name: 'Machu Picchu', coordinates: [-72.545556, -13.163333]},
    {id: 4, name: 'Chichen Itza', coordinates: [-88.568611, 20.683056]},
    {id: 5, name: 'Colosseum', coordinates: [12.492269, 41.890169]},
    {id: 6, name: 'Taj Mahal', coordinates: [78.041944, 27.175]},
  ];

  feedback;
  selectorDisabled = false;

  selectedWonder = (ev) => {
    // verify that a wonder is selected
    if (ev.target.value === '') {
      return;
    }

    // disable the panel
    this.disablePanel(this.sevenWonders[ev.target.value].name);

    // call the panMap method of the child map component
    this.map.panMap(this.sevenWonders[ev.target.value].coordinates)
    .then(() => {
      this.enablePanel();
    })
    .catch((err) => {
      console.log(err);
    });

  }

  disablePanel = (name) => {
    this.selectorDisabled = true;
    this.feedback = this.feedback = 'Panning to ' + name + '.';
  }

  enablePanel = () => {
    this.selectorDisabled = false;
    this.feedback = 'Done!';
    setTimeout(() => { this.feedback = ''; }, 1000);
  };

  constructor() { }

  ngOnInit() {
  }

}
