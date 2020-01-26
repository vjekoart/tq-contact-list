import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.scss']
})
export class SearchFieldComponent implements OnInit {
  @Output() inputChange = new EventEmitter<string>();

  public keyword: string;

  constructor() {}

  ngOnInit() {}

  public emitChange() {
      this.inputChange.emit(this.keyword.trim());
  }
}
