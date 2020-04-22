import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaRisorseComponent } from './lista-risorse/lista-risorse.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DettaglioRisorsaComponent } from './dettaglio-risorsa/dettaglio-risorsa.component';
import { ModificaRisorsaComponent } from './modifica-risorsa/modifica-risorsa.component';

@NgModule({
  declarations: [
    AppComponent,
    ListaRisorseComponent,
    DettaglioRisorsaComponent,
    ModificaRisorsaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
