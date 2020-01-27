import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { MockApiService } from 'src/app/services/mock-api.service';

const _tag = '[StoreService]';

export interface ContactNumber {
  number: string;
  name: string;
}

export interface ContactModel {
  id: number;
  name: string;
  image?: string;
  favorited: boolean;
  email?: string;
  numbers?: ContactNumber[];
}

export interface CreateContactModel {
  name: string;
  image?: string;
  favorited?: boolean;
  email?: string;
  numbers?: ContactNumber[];
}

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private _contact = new BehaviorSubject<ContactModel | {}>({});
  private _contacts = new BehaviorSubject<ContactModel[]>([]);
  private _favorites = new BehaviorSubject<ContactModel[]>([]);

  private store: {
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

  /**
   * Placeholder function. In real world it may be required to do some setup or
   * API calls before store is ready.
   */
  public async init(): Promise<boolean> {
    return new Promise((resolve, reject) => resolve(true));
  }

  /**
   * Update state of storeService.contact observable with
   * desired contact.
   */
  public getOne(id: number): void {
    this.apiService.getValue('contacts').then((contacts: ContactModel[]) => {
      const target = contacts.find(el => el.id === id);

      if (!target)
        return;

      this._contact.next(Object.assign({}, target));
    });
  }

  /**
   * Update state of storeService.contacts observable with all available
   * contacts.
   */
  public getAll(keyword?: string): void {
    this.apiService.getValue('contacts').then((contacts: ContactModel[]) => {
      this.store.contacts = contacts.filter(contact => {
        if (!keyword)
          return true;

        if (contact.name.toLowerCase().includes(keyword.toLowerCase()))
          return true;

        return false;
      });

      this._contacts.next(Object.assign({}, this.store).contacts);
    });
  }

  /**
   * Update state of storeService.favorites observable with all favorited
   * contacts.
   */
  public getFavorites(keyword?: string): void {
    this.apiService.getValue('contacts').then((contacts: ContactModel[]) => {
      this.store.favorites = contacts.filter(contact => {
        if (!contact.favorited)
          return false;

        if (!keyword)
          return true;

        if (contact.name.toLowerCase().includes(keyword.toLowerCase()))
          return true;

        return false;
      });

      this._favorites.next(Object.assign({}, this.store).favorites);
    });
  }

  /**
   * Create new contact, and update storeService.contacts
   * storeService.favorites (if required) observables with newly created
   * contact.
   */
  public createOne(newContact: CreateContactModel): void {
    this.apiService.getValue('contacts').then((contacts: ContactModel[]) => {
      let maxId = -1;

      contacts.forEach(el => {
        maxId = el.id > maxId ? el.id : maxId;
      });

      const finalContact: ContactModel = Object.assign({
        id: ++maxId,
        favorited: (newContact.favorited === true) || false
      }, newContact);

      contacts.push(finalContact);

      this.store.contacts = contacts;
      this.apiService.updateValue('contacts', this.store.contacts);
      this._contacts.next(Object.assign({}, this.store).contacts);

      // If applicable, add new contact to favorites
      if (finalContact.favorited !== true)
        return;

      this.store.favorites.push(finalContact);
      this._favorites.next(Object.assign({}, this.store).favorites);
    });
  }

  /**
   * Update existing contact with provided ID with new properties provided
   * in newState object.
   */
  public updateOne(id: number, newState: any): void {
    // Update all contacts
    let contactsIndex = -1;

    const inContacts = this.store.contacts.find((el, i) => {
      if (el.id === id) {
        contactsIndex = i;
        return true;
      }

      return false;
    });

    const newContact = Object.assign(inContacts, newState);

    this.store.contacts[contactsIndex] = newContact;
    this.apiService.updateValue('contacts', this.store.contacts);
    this._contacts.next(Object.assign({}, this.store).contacts);

    // Update favorites
    let favoritesIndex = -1;

    const inFavorites = this.store.favorites.find((el, i) => {
      if (el.id === id) {
        favoritesIndex = i;
        return true;
      }

      return false;
    });

    if (favoritesIndex > -1 && newContact.favorited)
      this.store.favorites[favoritesIndex] = newContact;
    else if (favoritesIndex > -1 && !newContact.favorited)
      this.store.favorites.splice(favoritesIndex, 1);
    else if (newContact.favorited)
      this.store.favorites.push(newContact);

    this._favorites.next(Object.assign({}, this.store).favorites);
  }

  /**
   * Delete existing contact with provided ID.
   */
  public deleteOne(id: number): void {
    // Delete from all contacts
    let contactsIndex = -1;

    const inContacts = this.store.contacts.find((el, i) => {
      if (el.id === id) {
        contactsIndex = i;
        return true;
      }

      return false;
    });

    if (!inContacts)
      return;

    this.store.contacts.splice(contactsIndex, 1);
    this.apiService.updateValue('contacts', this.store.contacts);
    this._contacts.next(Object.assign({}, this.store).contacts);

    // Delete from favorites
    let favoritesIndex = -1;

    const inFavorites = this.store.favorites.find((el, i) => {
      if (el.id === id) {
        favoritesIndex = i;
        return true;
      }

      return false;
    });

    if (!inFavorites)
      return;

    this.store.favorites.splice(favoritesIndex, 1);
    this._favorites.next(Object.assign({}, this.store).favorites);
  }
}
