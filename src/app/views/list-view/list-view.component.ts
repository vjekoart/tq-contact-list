import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ActionService } from 'src/app/services/action.service';
import { StoreService, ContactModel } from 'src/app/services/store.service';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit {

  public contacts: Observable<ContactModel[]>;

  constructor(
    public action: ActionService,
    public store: StoreService,
    public router: Router
  ) {}

  ngOnInit() {
    this.contacts = this.store.contacts$;
    this.action.getContacts();
  }
}
