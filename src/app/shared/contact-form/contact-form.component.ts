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
  @Input('name') contactName: string = '';
  @Input('email') contactEmail: string = '';
  @Input('numbers') contactNumbers: ContactNumber[] = [];
  @Input('image') contactImage: string = '';
  @Input('favorited') contactFavorited = false;

  @Input('readonly') formReadonly = false;
  @Input('hasBack') formHasBack = false;
  @Input('hasCancel') formHasCancel = false;
  @Input('hasDelete') formHasDelete = false;
  @Input('hasEdit') formHasEdit = false;
  @Input('hasFavorite') formHasFavorite = false;
  @Input('hasSave') formHasSave = false;

  @Output() onBack = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>();
  @Output() onDelete = new EventEmitter<void>();
  @Output() onEdit = new EventEmitter<void>();
  @Output() onFavorite = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}
}
