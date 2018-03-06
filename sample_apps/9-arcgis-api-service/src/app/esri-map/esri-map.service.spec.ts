import {TestBed, inject, ComponentFixture} from '@angular/core/testing';
import { EsriMapComponent } from './esri-map.component';
import { EsriMapService } from './esri-map.service';

describe('EsriMapService', () => {

  let component: EsriMapComponent;
  let fixture: ComponentFixture<EsriMapComponent>;
  let app: any; // debugElement.componentInstance

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EsriMapService],
      declarations: [EsriMapComponent],
    })
      .compileComponents();
    fixture = TestBed.createComponent(EsriMapComponent);
    app = fixture.debugElement.componentInstance;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', inject([EsriMapService], (service: EsriMapService) => {
    expect(service).toBeTruthy();
    service.loadMap('topo',[0,0],10, app.mapViewEl).then((r) => {
      console.log('booyahs ' + r);
      expect(r).toBeTruthy();
    });
  }));

  it('mapLoaded event fired', (done) => {
    app.mapLoaded.subscribe(g => {
      expect(g).toBeTruthy();
      done();
    });
  });
});
