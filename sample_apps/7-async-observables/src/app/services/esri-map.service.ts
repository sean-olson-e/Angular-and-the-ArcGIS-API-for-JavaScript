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
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class EsriMapService {

  panRequest = new Subject<void>();
  panComplete = new Subject<void>();

  sevenWonders = [
    {id: 0, name: 'Great Wall of China', coordinates: [117.23, 40.68]},
    {id: 1, name: 'Petra', coordinates: [35.44194444, 30.32861111]},
    {id: 2, name: 'Christ the Redeemer', coordinates: [-43.210556, -22.951944]},
    {id: 3, name: 'Machu Picchu', coordinates: [-72.545556, -13.163333]},
    {id: 4, name: 'Chichen Itza', coordinates: [-88.568611, 20.683056]},
    {id: 5, name: 'Colosseum', coordinates: [12.492269, 41.890169]},
    {id: 6, name: 'Taj Mahal', coordinates: [78.041944, 27.175]},
  ];

  wonderCoordinates;

  panToWonder(wonder_coordinates){
    this.wonderCoordinates = wonder_coordinates;
    this.panRequest.next();
  }

  panToWonderComplete(){
    this.panComplete.next();
  }

  constructor() { }
}
