import { Component, OnInit } from '@angular/core';
import { RisorsaService } from '../risorsa.service';
import { Risorsa } from '../risorsa';

@Component({
  selector: 'app-lista-risorse',
  templateUrl: './lista-risorse.component.html',
  styleUrls: ['./lista-risorse.component.css']
})
export class ListaRisorseComponent implements OnInit {

  risorse : Risorsa[] = [];

  constructor(private risorsaService: RisorsaService) { }

  ngOnInit(): void {
    this.risorsaService.getAllRisorse().subscribe(risorseInput => {
      this.risorse = risorseInput;
    })
    
  }

}
