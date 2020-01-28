import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';

@Component({
  selector: 'app-contact-box',
  templateUrl: './contact-box.component.html',
  styleUrls: ['./contact-box.component.scss']
})
export class ContactBoxComponent implements OnInit {
  @Input() name = '[Unknown Contact]';
  @Input() image = '';
  @Input() favorited = false;

  @Output() openAction = new EventEmitter<void>();
  @Output() favoriteAction = new EventEmitter<void>();
  @Output() editAction = new EventEmitter<void>();
  @Output() deleteAction = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}
}
