import { Injectable } from '@angular/core';

const TAG = '[MockApiService]';

export type ReqAction = 'get-one' |
                        'get-all' |
                        'get-fav' |
                        'create' |
                        'update' |
                        'delete';

@Injectable({
  providedIn: 'root'
})
export class MockApiService {

  private localStorageKey = 'tq-contact-list';
  private memory: any = {};

  constructor() {}

  public async init(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const existingValue = window.localStorage.getItem(this.localStorageKey);

      if (!existingValue) {
        console.log(TAG, 'No existing data in localStorage, preset contact list will be used.');

        window.fetch('assets/mock-data.json')
          .then(response => {
            try {
              const jsonData = response.json();
              return jsonData;
            } catch (error) {
              console.warn(TAG, 'Error while parsing preset contact list, setting empty data.', error);
              return {};
            }
          })
          .then(jsonResponse => {
            this.memory = jsonResponse;
            resolve(true);
          });

        return;
      }

      try {
        this.memory = JSON.parse(existingValue);
      } catch (error) {
        console.warn(TAG, 'Error while parsing existing data in localStorage, setting empty data.', error);
        this.memory = {};
      }

      resolve(true);
    });
  }

  public async request(action: ReqAction, payload: any): Promise<any> {
    switch (action) {
      case 'get-one':
        return this.getOne('contacts', payload.id);

      case 'get-all':
        return this.getAll('contacts', payload.keyword);

      case 'get-fav':
        return this.getFavorites('contacts', payload.keyword);

      case 'create':
        return this.createOne('contacts', payload.data);

      case 'update':
        return this.updateOne('contacts', payload.id, payload.data);

      case 'delete':
        return this.deleteOne('contacts', payload.id);

      default:
        console.warn(TAG, 'request: unknown action');
        break;
    }
  }

  private async getOne(key: string, id: number): Promise<any> {
    const collection = this.memory[key];
    const target = collection.find(el => el.id === id);

    return target;
  }

  private async getAll(key: string, keyword?: string): Promise<any[]> {
    const collection = this.memory[key];

    return collection.filter(el => {
      if (!keyword) {
        return true;
      }

      return el.name.toLowerCase().includes(keyword.toLowerCase());
    });
  }

  private async getFavorites(key: string, keyword?: string): Promise<any> {
    const collection = this.memory[key];

    return collection.filter(el => {
      if (!el.favorited) {
        return false;
      }

      if (!keyword) {
        return true;
      }

      return el.name.toLowerCase().includes(keyword.toLowerCase());
    });
  }

  private async createOne(key: string, data: any): Promise<any> {
    const collection = this.memory[key];

    let maxId = -1;

    collection.forEach(el => {
      maxId = el.id > maxId ? el.id : maxId;
    });

    const finalData = Object.assign({
      id: ++maxId
    }, data);

    this.memory[key].push(finalData);
    this.saveMemory();

    return finalData;
  }

  private async updateOne(key: string, id: number, data: any): Promise<any> {
    const collection = this.memory[key];
    const collectionLength = collection.length;

    for (let i = 0; i < collectionLength; ++i) {
      if (collection[i].id !== id) {
        continue;
      }

      const finalData = Object.assign(collection[i], data);

      this.memory[key][i] = finalData;
      this.saveMemory();

      return finalData;
    }
  }

  private async deleteOne(key: string, id: number): Promise<boolean> {
    const collection = this.memory[key];
    const collectionLength = collection.length;

    for (let i = 0; i < collectionLength; ++i) {
      if (collection[i].id !== id) {
        continue;
      }

      this.memory[key].splice(i, 1);
      this.saveMemory();

      return true;
    }

    return false;
  }

  private saveMemory() {
    window.localStorage.setItem(this.localStorageKey, JSON.stringify(this.memory));
  }
}
