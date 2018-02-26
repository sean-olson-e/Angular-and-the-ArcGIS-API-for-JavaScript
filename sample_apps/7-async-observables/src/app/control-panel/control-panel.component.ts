import { Component, OnInit } from '@angular/core';
import { EsriMapService } from '../services/esri-map.service';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent implements OnInit {

  feedback;
  selectorDisabled = false;
  sevenWonders = this.mapService.sevenWonders;
  panCompleteSubscription: any;

  selectedWonder = (ev) => {
    // verify that a wonder is selected
    if (ev.target.value === '') {
      return;
    }

    // disable the panel
    this.disablePanel(this.sevenWonders[ev.target.value].name);

    // // call the panMap method of the child map component
    this.mapService.panToWonder(this.sevenWonders[ev.target.value].coordinates);

  }

  disablePanel = (name) => {
    this.selectorDisabled = true;
    this.feedback = 'Panning to ' + name + '.';
  }

  enablePanel = () => {
    this.selectorDisabled = false;
    this.feedback = 'Done!';
    setTimeout(() => { this.feedback = ''; }, 1000);
  }

  constructor(private mapService: EsriMapService) { }

  ngOnInit() {
    this.panCompleteSubscription = this.mapService.panComplete.subscribe(() => {
      this.enablePanel();
    });
  }

}
