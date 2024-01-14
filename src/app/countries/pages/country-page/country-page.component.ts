import { Component } from '@angular/core';
import { Country } from '../../interfaces/countries.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-country-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './country-page.component.html',
  styles: ``
})
export class CountryPageComponent {
  public country?: Country;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private countriesService: CountriesService

  ){}

  ngOnInit():void{
    this.activatedRoute.params
    .pipe(
      switchMap(({id}) => this.countriesService.searchCountryByAlphaCode(id))
    )
    .subscribe( country => {
      if(!country) return this.router.navigateByUrl('');
      else return this.country = country;
    })
  }

  previousPage():void{
    if(localStorage.getItem('path')){
      this.router.navigateByUrl(localStorage.getItem('path') || '')
    }
  }
}
