import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {

  private _data: any[];

  @Input() set data(dataInput : any[]){
    this._data = dataInput;
    this.onClickPage(1);
  }

  @Input() forPage: number = 10;
  
  @Output() dataShown = new EventEmitter<any[]>();


  currentPage: number = 1;
  numberOfPages: number = 1;


  maxNumberOfPageButton = 10;

  get startPage(): number {
    return this.paginatorButton.startPage;
  }

  private paginatorButton = {
    startPage: 1,
    endPage: this.maxNumberOfPageButton
  }

  numberOfPageButtonToShow(): number {
    return Math.min(this.maxNumberOfPageButton, this.numberOfPages);
  }

  constructor() { }

  ngOnInit(): void {
  }

  onClickPage(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.updateStartEndPage();
    this.updateDataShown();
  }

  updateStartEndPage(): void {
    let pagesToAdd = this.maxNumberOfPageButton - 1;
    let pagesToAddBefore = Math.floor(pagesToAdd / 2);
    let pagesToAddAfter = pagesToAdd - pagesToAddBefore;

    this.paginatorButton.startPage = Math.max(1, Math.min(this.numberOfPages - pagesToAdd, this.currentPage - pagesToAddBefore));
    this.paginatorButton.endPage = Math.min(this.numberOfPages, this.currentPage + pagesToAddAfter);
  }

  updateDataShown(): void {
    this.numberOfPages = Math.ceil(this._data.length / this.forPage);
    let startIndex = Math.max(0, this.forPage * (this.currentPage - 1));
    let endIndex = Math.min(this._data.length, startIndex + (this.forPage));

    let dataToShow = this._data.slice(startIndex, endIndex);
    this.dataShown.emit(dataToShow);
  }

}
