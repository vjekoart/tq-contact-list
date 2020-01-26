import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { ActionService } from 'src/app/services/action.service';
import { DataService, ContactModel } from 'src/app/services/data.service';

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.scss']
})
export class CreateContactComponent implements OnInit {

  constructor(
    public action: ActionService,
    public store: DataService,
    public location: Location,
    public router: Router
  ) {}

  ngOnInit() {
    // TODO: When contact is created, go to homepage
    // TODO: Handle form errors
  }
}
