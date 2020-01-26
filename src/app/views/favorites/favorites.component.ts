import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ActionService } from 'src/app/services/action.service';
import { DataService, ContactModel } from 'src/app/services/data.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  public contacts: Observable<ContactModel[]>;

  constructor(
    public action: ActionService,
    public store: DataService,
    public router: Router
  ) {}

  ngOnInit() {
    this.contacts = this.store.favorites;
    this.action.getFavorites();
  }
}
