import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { FavoriteContactEvent } from 'src/app/shared/contact-box/contact-box.component';

import { DataService, ContactModel } from 'src/app/services/data.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  public contacts: Observable<ContactModel[]>;

  constructor(private router: Router, private dataService: DataService) {}

  ngOnInit() {
    this.contacts = this.dataService.contacts;
    this.dataService.getFavorites();
  }

  public onOpenContact(contactId: number) {
    this.router.navigate(['details', contactId]);
  }

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
