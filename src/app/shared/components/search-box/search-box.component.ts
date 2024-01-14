import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'shared-search-box',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent {
  public value: string = '';

  @Input()
  public placeHolder: string = '';

  @Output()
  public onValue = new EventEmitter<string>();

  emitValue(value:string): void{
    this.onValue.emit(value);
  }

  ngOnInit():void{
    let term = localStorage.getItem('term');
    if (term){
      this.value = term;
    }
  }
}
