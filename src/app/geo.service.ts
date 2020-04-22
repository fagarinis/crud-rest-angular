import { Injectable } from '@angular/core';

import { HttpHeaders, HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Regione, Provincia, Comune } from './place';

@Injectable({
  providedIn: 'root'
})
export class GeoService {

  private geoUrl = 'http://crud-rest.apps.37.187.91.6.nip.io/geo';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getRegioni(): Observable<Regione[]> {
    const url = this.geoUrl + "/regioni";

    return this.http.get<Regione[]>(url)
      .pipe(
        catchError(this.handleError<Regione[]>('getRegioni', []))
      );
  }

  getProvince(codiceRegione: number): Observable<Provincia[]> {
    const url = this.geoUrl + "/province/" + codiceRegione;

    return this.http.get<Provincia[]>(url)
      .pipe(
        catchError(this.handleError<Provincia[]>('getProvince', []))
      );
  }

  getComuni(codiceProvincia: string): Observable<Comune[]> {
    const url = this.geoUrl + "/comuni/" + codiceProvincia;

    return this.http.get<Comune[]>(url)
      .pipe(
        catchError(this.handleError<Comune[]>('getComuni', []))
      );
  }

  /**
* Handle Http operation that failed.
* Let the app continue.
* @param operation - name of the operation that failed
* @param result - optional value to return as the observable result
*/
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
