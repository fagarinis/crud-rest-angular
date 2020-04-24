import { Component, OnInit } from '@angular/core';

import { Risorsa } from '../risorsa';
import { RisorsaService } from '../risorsa.service';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { SettoreService } from '../settore.service';
import { Settore } from '../settore';
import { Provincia, Comune, Regione } from '../place';
import { GeoService } from '../geo.service';

@Component({
  selector: 'app-modifica-risorsa',
  templateUrl: './modifica-risorsa.component.html',
  styleUrls: ['./modifica-risorsa.component.css']
})
export class ModificaRisorsaComponent implements OnInit {


  showJson: boolean = true; //Testing
  notSelected = null;

  risorsaModel: Risorsa = new Risorsa();
  settori: Settore[] = [];
  regioni: Regione[] = [];
  province: Provincia[] = [];
  comuni: Comune[] = [];

  get regione(): Regione {
    return this.risorsaModel.residenza.regione;
  }
  set regione(regioneInput: Regione) {
    this.risorsaModel.residenza.regione = regioneInput;
  }
  get provincia(): Provincia {
    return this.risorsaModel.residenza.provincia;
  }
  set provincia(provinciaInput: Provincia) {
    this.risorsaModel.residenza.provincia = provinciaInput;
  }
  get comune(): Comune {
    return this.risorsaModel.residenza.comune;
  }
  set comune(comuneInput: Comune) {
    this.risorsaModel.residenza.comune = comuneInput;
  }

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private risorsaService: RisorsaService,
    private settoreService: SettoreService,
    private geoService: GeoService
  ) { }

  ngOnInit(): void {
    this.populateSettori();
    this.populateResidenza();

    const id: string = this.route.snapshot.paramMap.get('id');
    if (+id === 0) {
      delete this.risorsaModel._id;
      return;
    }

    this.risorsaService.getRisorsa(id).subscribe(risorsaInput => {
      this.risorsaModel = { ...this.risorsaModel, ...risorsaInput };

      this.populateSettori();
      this.populateResidenza();
    });
  }

  populateSettori(): void {
    this.settoreService.getAllSettori().subscribe(settoriInput => {
      this.settori = settoriInput;
    });
  }

  populateResidenza(): void {
    this.geoService.getRegioni().subscribe(regioniInput => {
      this.regioni = regioniInput;
      if (this.risorsaModel.residenza.regione) {
        this.populateProvince(this.regione.codice);
      }

    });
  }

  populateProvince(codiceRegione: number): void {
    this.geoService.getProvince(codiceRegione).subscribe(provinceInput => {
      this.province = provinceInput;
      if (this.risorsaModel.residenza.provincia) {
        this.populateComuni(this.provincia.codice);
      }
    });
  }

  populateComuni(codiceProvincia: string): void {
    this.geoService.getComuni(codiceProvincia).subscribe(comuniInput => {
      this.comuni = comuniInput;
    });
  }

  onRegioneChange(regione: Regione): void {
    this.comuni = [];
    this.comune = null;
    this.provincia = null;
    console.log("onRegioneChange codice regione selezionata: " + regione.codice)
    this.populateProvince(regione.codice);
  }

  onProvinciaChange(provincia: Provincia): void {
    this.comune = null;
    console.log("onProvinciaChange codice provincia selezionata: " + provincia.codice)
    this.populateComuni(provincia.codice);
  }

  submitForm(): void {
    if (this.risorsaModel._id) {
      this.executeUpdate();
    }
    else {
      this.executeAdd();
    }
  }

  executeUpdate(): void {
    this.risorsaService.updateRisorsa(this.risorsaModel).subscribe(risorsaInput => {
      console.log("risorsa aggiornata con successo");
      this.goBack();
    });
  }

  executeAdd(): void {
    this.risorsaService.addRisorsa(this.risorsaModel).subscribe(risorsaInput => {
      console.log("risorsa aggiunta con successo");
      this.goBack();
    });
  }


  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.codice == c2.codice : c1 == c2;
  }

  goBack(): void {
    this.location.back();
  }

}
