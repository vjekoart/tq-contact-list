import { Component, OnInit } from '@angular/core';

import { ToggleFavoriteEvent } from 'src/app/shared/contact-box/contact-box.component';

@Component({
  selector: 'app-all-contacts',
  templateUrl: './all-contacts.component.html',
  styleUrls: ['./all-contacts.component.scss']
})
export class AllContactsComponent implements OnInit {

  constructor() {}

  ngOnInit() {}

  public onToggleFavorite(event: ToggleFavoriteEvent) {
    console.log('onToggleFavorite', event);
  }

  public onDeleteContact(contactId: number) {
    console.log('onDeleteContact', contactId);
  }
}
