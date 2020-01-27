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
  private memory: Array<any> = [];

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
              console.warn(TAG, 'Error while parsing preset data, setting empty data.', error);
              return { data: [] };
            }
          })
          .then(jsonResponse => {
            if (!jsonResponse || !jsonResponse.data) {
              this.memory = [];
            } else {
              this.memory = jsonResponse.data;
            }

            resolve(true);
          });

        return;
      }

      try {
        const savedJson = JSON.parse(existingValue);

        if (!savedJson || !savedJson.data) {
          this.memory = [];
        } else {
          this.memory = savedJson.data;
        }
      } catch (error) {
        console.warn(TAG, 'Error while parsing existing data in localStorage, setting empty data.', error);
        this.memory = [];
      }

      resolve(true);
    });
  }

  public async request(action: ReqAction, payload: any): Promise<any> {
    switch (action) {
      case 'get-one':
        return this.getOne(payload.id);

      case 'get-all':
        return this.getAll(payload.keyword);

      case 'get-fav':
        return this.getFavorites(payload.keyword);

      case 'create':
        return this.createOne(payload.data);

      case 'update':
        return this.updateOne(payload.id, payload.data);

      case 'delete':
        return this.deleteOne(payload.id);

      default:
        console.warn(TAG, 'request: unknown action');
        break;
    }
  }

  private async getOne(id: number): Promise<any> {
    const collection = this.memory;
    const target = collection.find(el => el.id === id);

    return target;
  }

  private async getAll(keyword?: string): Promise<any[]> {
    const collection = this.memory;

    return collection.filter(el => {
      if (!keyword) {
        return true;
      }

      return el.name.toLowerCase().includes(keyword.toLowerCase());
    });
  }

  private async getFavorites(keyword?: string): Promise<any> {
    const collection = this.memory;

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

  private async createOne(data: any): Promise<any> {
    const collection = this.memory;

    let maxId = -1;

    collection.forEach(el => {
      maxId = el.id > maxId ? el.id : maxId;
    });

    const finalData = Object.assign({
      id: ++maxId
    }, data);

    this.memory.push(finalData);
    this.saveMemory();

    return finalData;
  }

  private async updateOne(id: number, data: any): Promise<any> {
    const collection = this.memory;
    const collectionLength = collection.length;

    for (let i = 0; i < collectionLength; ++i) {
      if (collection[i].id !== id) {
        continue;
      }

      const finalData = Object.assign(collection[i], data);

      this.memory[i] = finalData;
      this.saveMemory();

      return finalData;
    }
  }

  private async deleteOne(id: number): Promise<boolean> {
    const collection = this.memory;
    const collectionLength = collection.length;

    for (let i = 0; i < collectionLength; ++i) {
      if (collection[i].id !== id) {
        continue;
      }

      this.memory.splice(i, 1);
      this.saveMemory();

      return true;
    }

    return false;
  }

  private saveMemory() {
    const key = this.localStorageKey;
    const data = { data: this.memory };

    window.localStorage.setItem(key, JSON.stringify(data));
  }
}
