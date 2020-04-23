import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaRisorseComponent } from './lista-risorse/lista-risorse.component';
import { ModificaRisorsaComponent } from './modifica-risorsa/modifica-risorsa.component';
import { DettaglioRisorsaComponent } from './dettaglio-risorsa/dettaglio-risorsa.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';


const routes: Routes = [
  { path: 'risorse', component: ListaRisorseComponent },
  { path: 'risorse/:id', component: DettaglioRisorsaComponent },
  { path: 'risorse/:id/modifica', component: ModificaRisorsaComponent },
  { path: 'statistiche', component: PieChartComponent },

  { path: '', redirectTo: 'risorse', pathMatch: 'full' }, //default
  { path: '**', redirectTo: 'risorse', pathMatch: 'full' }  //se non esiste
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
