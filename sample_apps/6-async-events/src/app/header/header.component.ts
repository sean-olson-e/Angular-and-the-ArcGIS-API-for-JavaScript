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

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  header = 'Esri Dev Summit 2018: Async Operations Using the Angular Event Emitter';
  header_tag = 'Select a world wonder.  The selector is then disabled while the map pans to your selection. ' +
               ' Once complete, the map component emits an event and the dashboard selctor is enabled again';

  constructor() { }

  ngOnInit() {
  }

}
