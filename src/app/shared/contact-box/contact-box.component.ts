import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface ToggleFavoriteEvent {
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
  @Input('editLink') contactEditLink: string;
  @Input('favorite') contactFavorited: boolean = false;
  @Input('id') contactId: number;
  @Input('image') contactImage: string;
  @Input('name') contactName: string;

  @Output() toggleFavorite = new EventEmitter<ToggleFavoriteEvent>();
  @Output() deleteContact = new EventEmitter<number>();

  constructor() {}

  ngOnInit() {}

  public emitFavoriteEvent() {
    this.toggleFavorite.emit({
      id: this.contactId,
      favorite: this.contactFavorited
    });
  }

  public emitDeleteEvent() {
    this.deleteContact.emit(this.contactId);
  }
}
