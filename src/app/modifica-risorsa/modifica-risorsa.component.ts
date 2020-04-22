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
      settoriInput.map(settoreInput => {
        this.mantieniAttributi(settoreInput, "codice", "descrizione");
        this.settori.push(settoreInput);

        if (settoreInput.codice == this.risorsaModel.settore.codice) { // per far funzionare il binding in preselezione associo l'oggetto al model
          this.risorsaModel.settore = settoreInput;
        }
      })
    });
  }

  populateResidenza(): void {
    this.geoService.getRegioni().subscribe(regioniInput => {
      this.regioni = [];
      regioniInput.map(regioneInput => {
        this.mantieniAttributi(regioneInput, "codice", "descrizione");
        this.regioni.push(regioneInput);

        if (this.regione.codice == regioneInput.codice) { // Preselezione
          this.regione = regioneInput;
        }
      });

      if (this.risorsaModel.residenza && this.risorsaModel.residenza.regione) {
        this.populateProvince(this.regione.codice);
      }
    });
  }

  populateProvince(codiceRegione: number): void {
    if (!codiceRegione && codiceRegione !== 0) {
      this.province = [];
      this.comuni = [];
      return;
    }
    this.geoService.getProvince(codiceRegione).subscribe(provinceInput => {
      provinceInput.forEach(provincia => this.mantieniAttributi(provincia, "codice", "descrizione"));
      this.province = provinceInput;
      this.provincia = provinceInput.find(p => p.codice == this.provincia?.codice);
      if (!this.provincia) {
        this.provincia = this.notSelected;
        this.comune = this.notSelected;
      }
      else {
        this.populateComuni(this.provincia.codice);
      }
    });
  }

  populateComuni(codiceProvincia: string): void {
    if (!codiceProvincia) {
      this.comuni = [];
      return;
    }
    console.log("Popola comuni")
    this.geoService.getComuni(codiceProvincia).subscribe(comuniInput => {
      comuniInput.forEach(comune => this.mantieniAttributi(comune, "codice", "descrizione"));
      this.comuni = comuniInput;
      this.comune = comuniInput.find(c => c.codice == this.comune?.codice);
      if (!this.comune) {
        this.comune = this.notSelected;
      }
    });
  }

  onRegioneChange(regione: Regione): void {
    if (!regione) {
      this.province = [];
      this.comuni = [];
      return;
    }
    console.log("onRegioneChange codice regione selezionata: " + regione.codice)
    this.populateProvince(regione.codice);
  }

  onProvinciaChange(provincia: Provincia): void {
    if (!provincia) {
      this.comuni = [];
      return;
    }
    console.log("onProvinciaChange codice provincia selezionata: " + provincia.codice)
    this.populateComuni(provincia.codice);
  }

  /**
   *  Rimuove tutti i parametri dall'oggetto tranne quelli specificati
   * @param place 
   * @returns oggetto senza i parametri non specificati
   */
  mantieniAttributi(obj: any, ...attributiDaMantenere: string[]): any {
    for (let key of Object.keys(obj)) {
      if (!attributiDaMantenere.includes(key)) {
        delete obj[key];
      }
    }
    return obj
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

  goBack(): void {
    this.location.back();
  }

}
