import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { ActionService } from 'src/app/services/action.service';
import { StoreService, ContactModel, CreateContactModel } from 'src/app/services/store.service';

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.scss']
})
export class CreateContactComponent implements OnInit {

  constructor(
    public action: ActionService,
    public store: StoreService,
    public location: Location,
    public router: Router
  ) {}

  ngOnInit() {
    // TODO: When contact is created, go to homepage
    // TODO: Handle form errors
  }
}
