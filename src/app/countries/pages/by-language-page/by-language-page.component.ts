import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { SearchBoxComponent } from "../../../shared/components/search-box/search-box.component";
import { Country } from '../../interfaces/countries.interface';
import { CountriesTableComponent } from "../../components/countries-table/countries-table.component";
import { Router } from '@angular/router';

@Component({
    selector: 'app-by-language-page',
    standalone: true,
    templateUrl: './by-language-page.component.html',
    styles: ``,
    imports: [SearchBoxComponent, CountriesTableComponent]
})
export class ByLanguagePageComponent {
  public countries: Country[] =[];

  constructor (private countriesService: CountriesService, private router: Router){}

  ngOnInit(): void{
    let term: string= localStorage.getItem('term') || '';

    if (localStorage.getItem('path') !== this.router.url){
      this.countriesService.removeOnLocalStorage();
    }
    else{
      this.searchByLanguage(term);
    }
  }

  searchByLanguage(term: string): void{
    this.countriesService.searchLanguage(term)
    .subscribe(countries => {
      this.countries = countries;
    })
  }

}
