import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { MockApiService } from 'src/app/services/mock-api.service';

const _tag = '[DataService]';

export interface ContactModel {
  id: number;
  name: string;
  image: string;
  favorited: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _contacts = new BehaviorSubject<ContactModel[]>([]);

  private contactsStore: {
    contacts: ContactModel[]
  } = {
    contacts: []
  };

  readonly contacts = this._contacts.asObservable();

  constructor(private apiService: MockApiService) {}

  public async init(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      resolve(true);
    })
  }

  public getAll(): void {
    this.apiService.getValue('contacts').then(contacts => {
      this.contactsStore.contacts = contacts;
      this._contacts.next(Object.assign({}, this.contactsStore).contacts);
    });
  }

  public getFavorites(): void {
    this.apiService.getValue('contacts').then(contacts => {
      this.contactsStore.contacts = contacts.filter((contact: ContactModel) => contact.favorited);
      this._contacts.next(Object.assign({}, this.contactsStore).contacts);
    });
  }
}
