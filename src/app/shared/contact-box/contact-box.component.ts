import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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

  @Output() favoriteContact = new EventEmitter<FavoriteContactEvent>();
  @Output() editContact = new EventEmitter<number>();
  @Output() deleteContact = new EventEmitter<number>();

  constructor() {}

  ngOnInit() {}

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
