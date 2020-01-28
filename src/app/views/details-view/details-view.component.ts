import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ActionService } from 'src/app/services/action.service';
import { StoreService, ContactModel, UiErrors } from 'src/app/services/store.service';

@Component({
  selector: 'app-details-view',
  templateUrl: './details-view.component.html',
  styleUrls: ['./details-view.component.scss']
})
export class DetailsViewComponent implements OnInit {

  public contact: ContactModel|null = null;
  public contactId: number;

  constructor(
    public action: ActionService,
    public store: StoreService,
    public location: Location,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {
    // Listen for route changes
    this.route.paramMap.subscribe(params => {
      this.contactId = parseInt(params.get('id'), 10);
      this.action.getContact(this.contactId);
    });

    // Listen for active contact changes
    this.store.contact$.subscribe(contact => {
      this.contact = contact;
    });

    // If contact doesn't exists, go to dashboard (listen for changes)
    this.store.uiErrors$.subscribe((uiErrors: UiErrors) => {
      if (uiErrors.contactDoesntExist && uiErrors.contactDoesntExist.id === this.contactId) {
        this.router.navigate(['']);
      }
    });
  }
}
