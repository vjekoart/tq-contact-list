import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ActionService } from 'src/app/services/action.service';
import { DataService, ContactModel } from 'src/app/services/data.service';

@Component({
  selector: 'app-all-contacts',
  templateUrl: './all-contacts.component.html',
  styleUrls: ['./all-contacts.component.scss']
})
export class AllContactsComponent implements OnInit {

  public contacts: Observable<ContactModel[]>;

  constructor(
    public action: ActionService,
    public store: DataService,
    public router: Router
  ) {}

  ngOnInit() {
    this.contacts = this.store.contacts;
    this.action.getContacts();
  }
}
