import { Component, ViewChild, OnInit } from "@angular/core";
import { ChartComponent } from "ng-apexcharts";

import { ApexNonAxisChartSeries, ApexResponsive, ApexChart } from "ng-apexcharts";
import { SettoreService } from '../settore.service';
import { Settore } from '../settore';
import { RisorsaService } from '../risorsa.service';
import { Risorsa } from '../risorsa';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: "app-pie-chart",
  templateUrl: "./pie-chart.component.html",
  styleUrls: ["./pie-chart.component.css"]
})
export class PieChartComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  chartColors = ['#FFCDD2', '#9E9E9E', '#FF7043', '#3949AB', '#8BC34A','#C62828'];

  private settori: Settore[] = [];
  private countRisorse: number[] = [];

  constructor(private settoreService: SettoreService, private risorsaService: RisorsaService) {
    this.chartOptions = {
      
      series: [44, 55, 13, 43, 22, 14],
      
      chart: {
        type: "donut"
        
      },
      labels: ["Team A", "Team B", "Team C", "Team D", "Team E", "Team F"],
      
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }
  ngOnInit(): void {
    this.settoreService.getAllSettori().subscribe(settoriInput => {
      this.settori = settoriInput;
      this.chartOptions.labels = this.caricaLabels(this.settori);

      this.onClickButtonNumeroDipendenti();
    });

  }

  caricaLabels(settori: Settore[]): string[] {
    let labels: string[] = [];
    this.settori.forEach(s => labels.push(s.descrizione));
    return labels;
  }

  onClickButtonNumeroDipendenti(): void {
    this.risorsaService.getAllRisorse().subscribe(risorseInput => {
      this.chartOptions.series = this.caricaSeriesNumeroDipendenti(this.settori, risorseInput);
    })
  }

  onClickButtonStipendiRALTotali(): void {
    this.risorsaService.getAllRisorse().subscribe(risorseInput => {
      this.chartOptions.series = this.caricaSeriesStipendiRALTotali(this.settori, risorseInput);
    })
  }

  onClickButtonStipendioRALMedio(): void{
    this.risorsaService.getAllRisorse().subscribe(risorseInput => {
      let seriesNumeroDipendentiPerSettore: number[] = this.caricaSeriesNumeroDipendenti(this.settori, risorseInput);
      let seriesStipendioPerSettore: number[] = this.caricaSeriesStipendiRALTotali(this.settori, risorseInput);
      let series: number[] = [];
      for(let i=0; i < seriesNumeroDipendentiPerSettore.length; i++){
        if(seriesNumeroDipendentiPerSettore[i] === 0){
          series.push(0);
        }
        else{
          series.push(Math.round(seriesStipendioPerSettore[i]/seriesNumeroDipendentiPerSettore[i]));
        }
      }
      this.chartOptions.series = series;
    })
    
  }

  caricaSeriesNumeroDipendenti(settori: Settore[], risorse: Risorsa[]): number[] {
    let series: number[] = [];
    settori.forEach(settoreItem => series.push(0));

    risorse.forEach(risorsaItem => {
      for (let i = 0; i < series.length; i++) {
        if (settori[i].codice == risorsaItem.settore.codice) {
          series[i] += 1;
        }
      }

    });
    return series
  }

  caricaSeriesStipendiRALTotali(settori: Settore[], risorse: Risorsa[]): number[] {
    let series: number[] = [];
    settori.forEach(settoreItem => series.push(0));
    risorse.forEach(risorsaItem => {
      for (let i = 0; i < series.length; i++) {
        if (settori[i].codice == risorsaItem.settore.codice && +risorsaItem.stipendioRAL) {
          series[i] += +risorsaItem.stipendioRAL;
        }
      }

    });
    return series
  }
}


