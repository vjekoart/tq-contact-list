import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FavoriteContactEvent } from 'src/app/shared/contact-box/contact-box.component';

@Component({
  selector: 'app-all-contacts',
  templateUrl: './all-contacts.component.html',
  styleUrls: ['./all-contacts.component.scss']
})
export class AllContactsComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {}

  public onFavoriteContact(event: FavoriteContactEvent) {
    console.log('onFavoriteContact', event);
  }

  public onEditContact(contactId: number) {
    this.router.navigate(['edit', contactId]);
  }

  public onDeleteContact(contactId: number) {
    console.log('onDeleteContact', contactId);
  }
}
