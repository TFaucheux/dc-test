import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import { HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';

import { DatacountComponent} from './components/datacount/datacount.component';
import { BarChartComponent } from './components/barchart/barchart.component';
import { RowChartComponent } from './components/rowchart/rowchart.component';
import { AreaChartComponent } from './components/areachart/areachart.component';
import { LineChartComponent } from './components/linechart/linechart.component';
import { HeatMapComponent } from './components/heatmap/heatmap.component';
import { SeriesChartComponent } from './components/serieschart/serieschart.component';
import { CompositeChartComponent } from './components/compositechart/compositechart.component';
import { ChloroplethComponent } from './components/chloropleth/chloropleth.component';
import { PieChartComponent } from './components/piechart/piechart.component';
import { ScatterPlotComponent } from './components/scatterplot/scatterplot.component';
import { BoxPlotComponent } from './components/boxplot/boxplot.component';
import { NumberChartComponent } from './components/numberchart/numberchart.component';
import { AggDataComponent } from './components/aggdata/aggdata.component';

import { NdxService } from './services/ndx.service';
import { NdxProvider } from './ndx-provider';
import {AppStateService} from './services/AppStateService';

export function ndxProviderFactory(provider: NdxProvider) {
  return () => provider.load();
}

@NgModule({
  declarations: [
    AppComponent,
    DatacountComponent,
    BarChartComponent,
    RowChartComponent,
    AreaChartComponent,
    LineChartComponent,
    HeatMapComponent,
    SeriesChartComponent,
    CompositeChartComponent,
    PieChartComponent,
    ScatterPlotComponent,
    BoxPlotComponent,
    NumberChartComponent,
    AggDataComponent,
    ChloroplethComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
      AppStateService,
      NdxService,
      NdxProvider,
      { provide: APP_INITIALIZER, useFactory: ndxProviderFactory, deps: [NdxProvider], multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
