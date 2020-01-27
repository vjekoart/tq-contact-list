import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';

import { ContactNumber } from 'src/app/services/store.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  @Input() name = '';
  @Input() email = '';
  @Input() numbers: ContactNumber[] = [];
  @Input() image = '';
  @Input() favorited = false;

  @Input() locked = false;
  @Input() hasBack = false;
  @Input() hasCancel = false;
  @Input() hasDelete = false;
  @Input() hasEdit = false;
  @Input() hasFavorite = false;
  @Input() hasSave = false;

  @Output() backAction = new EventEmitter<void>();
  @Output() cancelAction = new EventEmitter<void>();
  @Output() deleteAction = new EventEmitter<void>();
  @Output() editAction = new EventEmitter<void>();
  @Output() favoriteAction = new EventEmitter<void>();
  @Output() saveAction = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}
}
