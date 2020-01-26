import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';

export interface FavoriteContactEvent {
  id: number;
  favorite: boolean;
}

@Component({
  selector: 'app-contact-box',
  templateUrl: './contact-box.component.html',
  styleUrls: ['./contact-box.component.scss']
})
export class ContactBoxComponent implements OnInit {
  @Input('detailsLink') contactDetailsLink: string;
  @Input('favorite') contactFavorited: boolean = false;
  @Input('id') contactId: number;
  @Input('image') contactImage: string;
  @Input('name') contactName: string;

  @Output() openContact = new EventEmitter<number>();
  @Output() favoriteContact = new EventEmitter<FavoriteContactEvent>();
  @Output() editContact = new EventEmitter<number>();
  @Output() deleteContact = new EventEmitter<number>();

  constructor() {}

  ngOnInit() {
    if (!this.contactImage)
      this.contactImage = 'assets/img/person.png';
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.contactImage && !changes.contactImage.currentValue)
      this.contactImage = 'assets/img/person.png';
  }

  public emitOpenEvent() {
    this.openContact.emit(this.contactId);
  }

  public emitFavoriteEvent() {
    this.favoriteContact.emit({
      id: this.contactId,
      favorite: this.contactFavorited
    });
  }

  public emitEditEvent() {
    this.editContact.emit(this.contactId);
  }

  public emitDeleteEvent() {
    this.deleteContact.emit(this.contactId);
  }
}
