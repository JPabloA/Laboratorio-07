import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Country } from '../interfaces/countries.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient, private router: Router) { }

  saveOnLocalStorage(term: string):void{
    localStorage.setItem('term', term);
    localStorage.setItem('path', this.router.url);
  }

  removeOnLocalStorage():void{
    localStorage.removeItem('term');
    localStorage.removeItem('path');
  }

  searchCountryByAlphaCode( code: string ): Observable<Country | null>{
    const url = `${this.apiUrl}/alpha/${code}`;
    return this.http.get<Country[]>(url)
    .pipe(
      map( countries => countries.length > 0 ? countries[0] : null ),
      catchError (() => of(null))
    );
  }

  searchCountry(term: string): Observable<Country[]>{
    this.saveOnLocalStorage(term)
    const url = `${this.apiUrl}/name/${term}`;
    return this.http.get<Country[]>(url)
    .pipe( // Para agarrar los errores del observable y de la llamada en si
      catchError(() => of([])) // Para que retorne un observable con []
    );
  }

  searchCapital(term: string): Observable<Country[]>{
    this.saveOnLocalStorage(term)
    const url = `${this.apiUrl}/capital/${term}`;
    return this.http.get<Country[]>(url)
    .pipe( //Para el manejo de errores
      catchError(() => of([]))
    );
  }

  searchRegion(term: string): Observable<Country[]>{
    console.log("try");
    this.saveOnLocalStorage(term)
    const url = `${this.apiUrl}/region/${term}`;
    return this.http.get<Country[]>(url)
    .pipe(
      catchError(() => of([]))
    );
  }

  searchLanguage(term: string): Observable<Country[]>{
    this.saveOnLocalStorage(term)
    const url = `${this.apiUrl}/lang/${term}`;
    return this.http.get<Country[]>(url)
    .pipe(
      catchError(() => of([]))
    );
  }
}
