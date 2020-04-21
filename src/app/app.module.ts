import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaRisorseComponent } from './lista-risorse/lista-risorse.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DettaglioRisorsaComponent } from './dettaglio-risorsa/dettaglio-risorsa.component';

@NgModule({
  declarations: [
    AppComponent,
    ListaRisorseComponent,
    DettaglioRisorsaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'risorse', component: ListaRisorseComponent },
      { path: 'risorse/:id', component: DettaglioRisorsaComponent },


      { path: '', redirectTo: 'risorse', pathMatch: 'full'}, //default
      { path: '**', redirectTo: 'risorse', pathMatch: 'full'}  //se non esiste
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
