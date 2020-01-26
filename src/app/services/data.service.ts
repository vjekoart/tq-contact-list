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
  private _favorites = new BehaviorSubject<ContactModel[]>([]);

  private contactsStore: {
    contacts: ContactModel[],
    favorites: ContactModel[]
  } = {
    contacts: [],
    favorites: []
  };

  readonly contacts = this._contacts.asObservable();
  readonly favorites = this._favorites.asObservable();

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
      this.contactsStore.favorites = contacts.filter((contact: ContactModel) => contact.favorited);
      this._favorites.next(Object.assign({}, this.contactsStore).favorites);
    });
  }

  public getOne(contactId: number): void {

  }

  public changeFavoriteState(contactId: number, newState: boolean): void {
    this.apiService.getValue('contacts').then(contacts => {
      let found: boolean = false;

      for (let i in contacts) {
        if (contacts[i].id === contactId) {
          if (contacts[i].favorited === newState)
            return;

          contacts[i].favorited = newState;
          found = true;
          break;
        }
      }

      if (!found) {
        console.error(_tag, 'Could not change favorite state since contact cannot be found.');
        return
      }

      this.apiService.updateValue('contacts', contacts)
        .then(status => {
          if (!status) {
            console.error(_tag, 'There was an error during update request.');
            return;
          }

          this.contactsStore.contacts = contacts;
          this._contacts.next(Object.assign({}, this.contactsStore).contacts);

          // If contact has been removed from favorites, update contactsStore.favorites array
          if (newState === false) {
            this.contactsStore.favorites.forEach((c, i) => {
              if (c.id === contactId) {
                this.contactsStore.favorites.splice(i, 1);
              }
            })

            this._favorites.next(Object.assign({}, this.contactsStore).favorites);
          }
        });
    });
  }
}
