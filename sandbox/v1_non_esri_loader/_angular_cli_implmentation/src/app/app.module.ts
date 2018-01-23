import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SimpleMapComponent } from './simple-map/simple-map.component';
import { DrawLineMapComponent } from './draw-line-map/draw-line-map.component';

@NgModule({
  declarations: [
    AppComponent,
    SimpleMapComponent,
    DrawLineMapComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
