import { Component } from '@angular/core';
import { Country } from '../../interfaces/countries.interface';
import { CountriesService } from '../../services/countries.service';
import { SearchBoxComponent } from "../../../shared/components/search-box/search-box.component";
import { CountriesTableComponent } from "../../components/countries-table/countries-table.component";
import { Router } from '@angular/router';

@Component({
    selector: 'app-by-region-page',
    standalone: true,
    templateUrl: './by-region-page.component.html',
    styles: ``,
    imports: [SearchBoxComponent, CountriesTableComponent]
})
export class ByRegionPageComponent {

  public countries: Country[] = [];

  constructor(private countriesService: CountriesService, private router: Router){}

  ngOnInit(): void{
    let term: string= localStorage.getItem('term') || '';

    if (localStorage.getItem('path') !== this.router.url){
      this.countriesService.removeOnLocalStorage();
    }
    else{
      this.searchByRegion(term);
    }
  }

  searchByRegion(term:string):void{
    this.countriesService.searchRegion(term)
    .subscribe(countries => {
      this.countries = countries;
    })
  }
}
