import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';

const defaultImage: string = 'assets/img/person.png';

export interface FavoriteContactEvent {
  id: number;
  favorite: boolean;
}

@Component({
  selector: 'app-contact-box',
  templateUrl: './contact-box.component.html',
  styleUrls: ['./contact-box.component.scss']
})
export class ContactBoxComponent implements OnInit, OnChanges {
  @Input('favorited') contactFavorited: boolean = false;
  @Input('image') contactImage: string = defaultImage;
  @Input('name') contactName: string = 'unknown';

  @Output() onOpen = new EventEmitter<void>();
  @Output() onFavorite = new EventEmitter<void>();
  @Output() onEdit = new EventEmitter<void>();
  @Output() onDelete = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {
    if (!this.contactImage)
      this.contactImage = this.sanitizeContactImage(this.contactImage);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.contactImage)
      this.contactImage = this.sanitizeContactImage(changes.contactImage.currentValue);
  }

  private sanitizeContactImage(image?: string): string {
    if (!this.contactImage || typeof this.contactImage !== 'string')
      return defaultImage;

    return this.contactImage;
  }
}
