import {
  Component,
  EventEmitter,
  OnInit,
  Output
} from '@angular/core';

@Component({
  selector: 'app-contact-add-box',
  templateUrl: './contact-add-box.component.html',
  styleUrls: ['./contact-add-box.component.scss']
})
export class ContactAddBoxComponent implements OnInit {
  @Output() openCreate = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}
}
