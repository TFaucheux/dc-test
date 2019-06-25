import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { ChartComponent } from './components/chart/chart.component';
import { NdxService } from './services/ndx.service';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [NdxService],
  entryComponents: [ChartComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
