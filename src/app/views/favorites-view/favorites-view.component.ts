import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ActionService } from 'src/app/services/action.service';
import { StoreService, ContactModel } from 'src/app/services/store.service';

@Component({
  selector: 'app-favorites-view',
  templateUrl: './favorites-view.component.html',
  styleUrls: ['./favorites-view.component.scss']
})
export class FavoritesViewComponent implements OnInit {

  public contacts: Observable<ContactModel[]>;

  constructor(
    public action: ActionService,
    public store: StoreService,
    public router: Router
  ) {}

  ngOnInit() {
    this.contacts = this.store.favorites$;
    this.action.getFavorites();
  }
}
