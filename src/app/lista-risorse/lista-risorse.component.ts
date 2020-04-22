import { Component, OnInit } from '@angular/core';
import { RisorsaService } from '../risorsa.service';
import { Risorsa } from '../risorsa';

import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-lista-risorse',
  templateUrl: './lista-risorse.component.html',
  styleUrls: ['./lista-risorse.component.css']
})
export class ListaRisorseComponent implements OnInit {

  risorse: Risorsa[] = [];

  constructor(
    private risorsaService: RisorsaService,
    private router: Router,
    private location: Location) { }

  ngOnInit(): void {
    this.populateRisorse();
  }

  populateRisorse() {
    this.risorsaService.getAllRisorse().subscribe(risorseInput => {
      this.risorse = risorseInput;
    })
  }

  eliminaRisorsa(risorsa: Risorsa) {
    const id = risorsa._id;
    const nomeCognome = risorsa.nome + " " + risorsa.cognome;

    if (confirm("Eliminare " + nomeCognome + "?")) {
      this.risorsaService.deleteRisorsa(risorsa._id).subscribe(
        input => { console.log(id + " eliminato con successo") },
        err => { console.log("cancellazione fallita") },
        () => {
          this.router.navigate(['/risorse'])
          this.populateRisorse();
        }
      );
    }
  }

}
