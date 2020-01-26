import { Component, OnInit } from '@angular/core';

import { DataService } from 'src/app/services/data.service';
import { MockApiService } from 'src/app/services/mock-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private dataService: DataService, private apiService: MockApiService) {}

  public ready: boolean = false;
  public fatal: boolean = false;

  async ngOnInit() {
    const apiStatus: boolean = await this.apiService.init();

    if (!apiStatus) {
      this.fatal = true;
      return
    }

    const dataStatus: boolean = await this.dataService.init();

    if (!dataStatus) {
      this.fatal = true;
      return
    }

    this.ready = true;
  }
}
