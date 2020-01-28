import { Injectable } from '@angular/core';

import { StoreService } from 'src/app/services/store.service';

const TAG = '[ActionService]';

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  constructor(private store: StoreService) {}

  public getContacts(keyword?: string) {
    this.store.getAll(keyword);
  }

  public getFavorites(keyword?: string) {
    this.store.getFavorites(keyword);
  }

  public getContact(contactId: number) {
    this.store.getOne(contactId);
  }

  public updateContact(contactId: number, newProperties: any) {
    this.store.updateOne(contactId, newProperties);
  }

  public deleteContact(contactId: number) {
    // TODO: Call DialogService, and if success, call store
    this.store.deleteOne(contactId);
  }

  public createContact(newProperties: any) {
    this.store.createOne(newProperties);
  }
}
