import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import { HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { ChartComponent } from './components/chart/chart.component';
import { BarChartComponent } from './components/barchart/barchart.component';
import { NdxService } from './services/ndx.service';
import {NdxProvider} from './ndx-provider';

export function ndxProviderFactory(provider: NdxProvider) {
  return () => provider.load();
}

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    BarChartComponent
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
