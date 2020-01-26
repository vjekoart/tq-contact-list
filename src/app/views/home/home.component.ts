import { Component, OnInit } from '@angular/core';

import { ActionService } from 'src/app/services/action.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(public action: ActionService) {}

  ngOnInit() {
    this.action.getContacts();
  }
}
