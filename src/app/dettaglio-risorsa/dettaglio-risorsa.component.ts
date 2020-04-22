import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Risorsa } from '../risorsa';
import { RisorsaService } from '../risorsa.service';


@Component({
  selector: 'app-dettaglio-risorsa',
  templateUrl: './dettaglio-risorsa.component.html',
  styleUrls: ['./dettaglio-risorsa.component.css']
})
export class DettaglioRisorsaComponent implements OnInit {

  risorsa: Risorsa;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private risorsaService: RisorsaService) { }

  ngOnInit(): void {
    const id: string = this.route.snapshot.paramMap.get('id');
    this.risorsaService.getRisorsa(id).subscribe(risorsaInput => {
      this.risorsa = risorsaInput;
    });
  }

  goBack(): void {
    this.location.back();
  }

}
