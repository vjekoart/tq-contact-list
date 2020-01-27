import { Component, OnInit } from '@angular/core';

import { StoreService } from 'src/app/services/store.service';
import { MockApiService } from 'src/app/services/mock-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private store: StoreService, private apiService: MockApiService) {}

  public ready = false;
  public fatal = false;

  async ngOnInit() {
    const apiStatus: boolean = await this.apiService.init();

    if (!apiStatus) {
      this.fatal = true;
      return;
    }

    const dataStatus: boolean = await this.store.init();

    if (!dataStatus) {
      this.fatal = true;
      return;
    }

    this.ready = true;
  }
}
