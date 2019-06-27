import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import { HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { BarChartComponent } from './components/barchart/barchart.component';
import { AreaChartComponent } from './components/areachart/areachart.component';
import { PieChartComponent } from './components/piechart/piechart.component';
import { ScatterPlotComponent } from './components/scatterplot/scatterplot.component';
import { NumberChartComponent } from './components/numberchart/numberchart.component';

import { NdxService } from './services/ndx.service';
import { NdxProvider } from './ndx-provider';
import {area} from 'd3-shape';

export function ndxProviderFactory(provider: NdxProvider) {
  return () => provider.load();
}

@NgModule({
  declarations: [
    AppComponent,
    BarChartComponent,
    AreaChartComponent,
    PieChartComponent,
    ScatterPlotComponent,
    NumberChartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
      NdxService,
      NdxProvider,
      { provide: APP_INITIALIZER, useFactory: ndxProviderFactory, deps: [NdxProvider], multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
