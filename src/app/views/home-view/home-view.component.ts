import { Component, OnInit } from '@angular/core';

import { ActionService } from 'src/app/services/action.service';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.scss']
})
export class HomeViewComponent implements OnInit {
  constructor(public action: ActionService) {}

  ngOnInit() {
    this.action.getContacts();
  }
}
