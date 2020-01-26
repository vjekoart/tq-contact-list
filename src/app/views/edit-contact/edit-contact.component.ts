import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ActionService } from 'src/app/services/action.service';
import { DataService, ContactModel } from 'src/app/services/data.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss']
})
export class EditContactComponent implements OnInit {

  public contact: Observable<ContactModel | {}>;
  public contactId: number;

  constructor(
    public action: ActionService,
    public store: DataService,
    public location: Location,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {
    // TODO: If contact doesn't exists, go to dashboard
    // TODO: When contact is deleted, go to homepage
    // TODO: Handle form errors
    this.contact = this.store.contact;
    this.route.paramMap.subscribe(params => {
      this.contactId = parseInt(params.get('id'), 10);
      this.action.getContact(this.contactId);
    })
  }
}
