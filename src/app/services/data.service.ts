import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { MockApiService } from 'src/app/services/mock-api.service';

const _tag = '[DataService]';

export interface ContactNumber {
  number: string;
  name: string;
}

export interface ContactModel {
  id: number;
  name: string;
  image: string;
  favorited: boolean;
  email: string;
  numbers: ContactNumber[];
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _contact = new BehaviorSubject<ContactModel | {}>({});
  private _contacts = new BehaviorSubject<ContactModel[]>([]);
  private _favorites = new BehaviorSubject<ContactModel[]>([]);

  private contactsStore: {
    contact: ContactModel | {},
    contacts: ContactModel[],
    favorites: ContactModel[]
  } = {
    contact: {},
    contacts: [],
    favorites: []
  };

  readonly contact = this._contact.asObservable();
  readonly contacts = this._contacts.asObservable();
  readonly favorites = this._favorites.asObservable();

  constructor(private apiService: MockApiService) {}

  public async init(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      resolve(true);
    })
  }

  public getAll(keyword?: string): void {
    this.apiService.getValue('contacts').then((contacts: ContactModel[]) => {
      this.contactsStore.contacts = contacts.filter(contact => {
        if (!keyword)
          return true;

        if (contact.name.toLowerCase().includes(keyword.toLowerCase()))
          return true;

        return false;
      });

      this._contacts.next(Object.assign({}, this.contactsStore).contacts);
    });
  }

  public getFavorites(keyword?: string): void {
    this.apiService.getValue('contacts').then((contacts: ContactModel[]) => {
      const filterFavorites = contact => contact.favorited;
      const filterKeyword = contact => {
        if (!keyword)
          return true;

        if (contact.name.toLowerCase().includes(keyword.toLowerCase()))
          return true;

        return false;
      };

      this.contactsStore.favorites = contacts.filter(filterFavorites).filter(filterKeyword);
      this._favorites.next(Object.assign({}, this.contactsStore).favorites);
    });
  }

  public getOne(id: number): void {
    this.apiService.getValue('contacts').then((contacts: ContactModel[]) => {
      const target = contacts.find(el => el.id === id);

      if (!target)
        return;

      this._contact.next(Object.assign({}, target));
    });
  }

  public updateOne(id: number, newState: any) {
    // Update all contacts
    let contactsIndex = -1;

    const contactsTarget = this.contactsStore.contacts.find((el, i) => {
      if (el.id === id) {
        contactsIndex = i;
        return true;
      }

      return false;
    });

    const newItem = Object.assign(contactsTarget, newState);

    this.contactsStore.contacts[contactsIndex] = newItem;
    this.apiService.updateValue('contacts', this.contactsStore.contacts);
    this._contacts.next(Object.assign({}, this.contactsStore).contacts);

    // Update favorites
    let favoritesIndex = -1;

    const favoritesTarget = this.contactsStore.favorites.find((el, i) => {
      if (el.id === id) {
        favoritesIndex = i;
        return true;
      }

      return false;
    });

    if (favoritesIndex > -1 && newItem.favorited)
      this.contactsStore.favorites[favoritesIndex] = newItem;
    else if (favoritesIndex > -1 && !newItem.favorited)
      this.contactsStore.favorites.splice(favoritesIndex, 1);
    else if (newItem.favorited)
      this.contactsStore.favorites.push(newItem);

    this._favorites.next(Object.assign({}, this.contactsStore).favorites);
  }

  public deleteOne(id: number) {
    // Delete from all contacts
    let contactsIndex = -1;

    const contactsTarget = this.contactsStore.contacts.find((el, i) => {
      if (el.id === id) {
        contactsIndex = i;
        return true;
      }

      return false;
    });

    if (!contactsTarget)
      return;

    this.contactsStore.contacts.splice(contactsIndex, 1);
    this.apiService.updateValue('contacts', this.contactsStore.contacts);
    this._contacts.next(Object.assign({}, this.contactsStore).contacts);

    // Delete from favorites
    let favoritesIndex = -1;

    const favoritesTarget = this.contactsStore.favorites.find((el, i) => {
      if (el.id === id) {
        favoritesIndex = i;
        return true;
      }

      return false;
    });

    if (!favoritesTarget)
      return;

    this.contactsStore.favorites.splice(favoritesIndex, 1);
    this._favorites.next(Object.assign({}, this.contactsStore).favorites);
  }

  public createOne(newState: any) {
    // TODO
  }
}
