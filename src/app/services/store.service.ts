import { EventEmitter, Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { MockApiService, ReqAction } from 'src/app/services/mock-api.service';

const TAG = '[StoreService]';

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

export interface UiErrors {
  contactDoesntExist: { id: number }|null;
}

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private store: {
    contact: ContactModel|null,
    contacts: ContactModel[],
    favorites: ContactModel[],
    uiErrors: UiErrors|{}
  } = {
    contact: null,
    contacts: [],
    favorites: [],
    uiErrors: {}
  };

  // Subjects
  private subjectContact = new BehaviorSubject<ContactModel|null>(null);
  private subjectContacts = new BehaviorSubject<ContactModel[]>([]);
  private subjectFavorites = new BehaviorSubject<ContactModel[]>([]);
  private subjectUiErrors = new BehaviorSubject<UiErrors|{}>({});

  readonly contact$ = this.subjectContact.asObservable();
  readonly contacts$ = this.subjectContacts.asObservable();
  readonly favorites$ = this.subjectFavorites.asObservable();
  readonly uiErrors$ = this.subjectUiErrors.asObservable();

  // Events
  readonly contactCreated$: EventEmitter<void> = new EventEmitter();
  readonly contactUpdated$: EventEmitter<void> = new EventEmitter();
  readonly contactDeleted$: EventEmitter<void> = new EventEmitter();

  constructor(private apiService: MockApiService) {}

  /**
   * Placeholder.
   */
  public async init(): Promise<boolean> {
    return new Promise((resolve, reject) => resolve(true));
  }

  /**
   * Get contact by ID.
   */
  public getOne(id: number): void {
    this.apiService.request('get-one', { id })
      .then(contact => {
        if (contact) {
          this.store.contact = contact;
          this.subjectContact.next(this.store.contact);
          return;
        }

        this.store.uiErrors = Object.assign(this.store.uiErrors, {
          contactDoesntExist: { id }
        });
        this.subjectUiErrors.next(this.store.uiErrors);
      })
      .catch(error => {
        // TODO: Handle error
      });
  }

  /**
   * Get all contacts. If set, filter by keyword.
   */
  public getAll(keyword?: string): void {
    this.apiService.request('get-all', { keyword })
      .then(contacts => {
        if (contacts) {
          this.store.contacts = contacts;
          this.subjectContacts.next(this.store.contacts);
          return;
        }

        // TODO: Handle error
      })
      .catch(error => {
        // TODO: Handle error
      });
  }

  /**
   * Get all favorite contacts. If set, filter by keyword.
   */
  public getFavorites(keyword?: string): void {
    this.apiService.request('get-fav', { keyword })
      .then(favorites => {
        if (favorites) {
          this.store.favorites = favorites;
          this.subjectFavorites.next(this.store.favorites);
          return;
        }

        // TODO: Handle error
      })
      .catch(error => {
        // TODO: Handle error
      });
  }

  /**
   * Create new contact and update store.
   *
   * Note: this function won't add contact to list of favorited contacts,
   * since newly created contact cannot be favorited.
   */
  public createOne(data: CreateContactModel): void {
    this.apiService.request('create', { data })
      .then(createdContact => {
        if (createdContact) {
          // Add contact to store
          this.store.contacts.push(createdContact);
          this.subjectContacts.next(this.store.contacts);
          this.contactCreated$.emit();
          return;
        }

        // TODO: Handle error
      })
      .catch(error => {
        // TODO: Handle error
      });
  }

  /**
   * Update existing contact with provided ID with new properties provided
   * in data object and update store.
   */
  public updateOne(id: number, data: any): void {
    this.apiService.request('update', { id, data })
      .then(updatedContact => {
        if (updatedContact) {
          // Update local copy
          this.updateContact(updatedContact);
          this.contactUpdated$.emit();
          return;
        }

        // TODO: Handle error
      })
      .catch(error => {
        // TODO: Handle error
      });
  }

  /**
   * Delete existing contact with provided ID and update store.
   */
  public deleteOne(id: number): void {
    this.apiService.request('delete', { id })
      .then(status => {
        if (status) {
          // Delete local copy
          this.removeContact(id);
          this.contactDeleted$.emit();
          return;
        }

        // TODO: Handle error
      })
      .catch(error => {
        // TODO: Handle error
      });
  }

  /**
   * Update all local references of contact with provided ID.
   */
  private updateContact(contact: ContactModel): void {
    // Update active contact
    if (this.store.contact && this.store.contact.id === contact.id) {
      this.store.contact = contact;
      this.subjectContact.next(this.store.contact);
    }

    // Update in all contacts
    const contactsCount = this.store.contacts.length;

    for (let i = 0; i < contactsCount; ++i) {
      if (this.store.contacts[i].id !== contact.id) {
        continue;
      }

      this.store.contacts[i] = contact;
      this.subjectContacts.next(this.store.contacts);
      break;
    }

    // Update in favorite contacts
    const favoritesCount = this.store.favorites.length;

    for (let i = 0; i < favoritesCount; ++i) {
      if (this.store.favorites[i].id !== contact.id) {
        continue;
      }

      if (contact.favorited) {
        this.store.favorites[i] = contact;
      } else {
        this.store.favorites.splice(i, 1);
      }

      this.subjectFavorites.next(this.store.favorites);
      break;
    }
  }

  /**
   * Remove contact from store.
   */
  private removeContact(id: number): void {
    // Remove active contact
    if (this.store.contact && this.store.contact.id === id) {
      this.store.contact = null;
      this.subjectContact.next(this.store.contact);
    }

    // Remove from all contacts
    const contactsCount = this.store.contacts.length;

    for (let i = 0; i < contactsCount; ++i) {
      if (this.store.contacts[i].id !== id) {
        continue;
      }

      this.store.contacts.splice(i, 1);
      this.subjectContacts.next(this.store.contacts);
      break;
    }

    // Remove from favorites
    const favoritesCount = this.store.favorites.length;

    for (let i = 0; i < favoritesCount; ++i) {
      if (this.store.favorites[i].id !== id) {
        continue;
      }

      this.store.favorites.splice(i, 1);
      this.subjectFavorites.next(this.store.favorites);
      break;
    }
  }
}
