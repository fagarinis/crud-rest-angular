import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgApexchartsModule } from "ng-apexcharts";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaRisorseComponent } from './lista-risorse/lista-risorse.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DettaglioRisorsaComponent } from './dettaglio-risorsa/dettaglio-risorsa.component';
import { ModificaRisorsaComponent } from './modifica-risorsa/modifica-risorsa.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { PaginatorComponent } from './paginator/paginator.component';




@NgModule({
  declarations: [
    AppComponent,
    ListaRisorseComponent,
    DettaglioRisorsaComponent,
    ModificaRisorsaComponent,
    PieChartComponent,
    PaginatorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    NgApexchartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
