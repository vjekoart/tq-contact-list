import { Injectable } from '@angular/core';

const _tag = '[MockApiService]';

@Injectable({
  providedIn: 'root'
})
export class MockApiService {

  private localStorageKey: string = 'tq-contact-list';
  private memory: any = {};

  constructor() {}

  public async init(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const existingValue = window.localStorage.getItem(this.localStorageKey);

      if (!existingValue) {
        console.log(_tag, 'Since there is no existing data, preset contact list will be populated.');

        window.fetch('assets/mock-data.json')
          .then(response => response.json())
          .then(jsonResponse => {
            this.memory = jsonResponse;
            resolve(true);
          })

        return;
      }

      try {
        this.memory = JSON.parse(existingValue);
      } catch (error) {
        console.error(_tag, 'Error while parsing existing localStorage value.', error);
        this.memory = {};
      }

      resolve(true);
    });
  }

  public async getValue(key: string): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!key || typeof this.memory[key] === 'undefined') {
        resolve(null);
        return;
      }

      resolve(this.memory[key]);
    });
  }

  public async updateValue(key: string, value: any): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (!key || typeof this.memory[key] === 'undefined') {
        resolve(false);
        return;
      }

      this.memory[key] = value;
      window.localStorage.setItem(this.localStorageKey, JSON.stringify(this.memory));

      resolve(true);
    });
  }

  public async deleteValue(key: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (!key || typeof this.memory[key] === 'undefined') {
        resolve(false);
        return;
      }

      delete this.memory[key];
      window.localStorage.setItem(this.localStorageKey, JSON.stringify(this.memory));

      resolve(true);
    });
  }

  public async createValue(key: string, value: any): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (!key || typeof this.memory[key] !== 'undefined') {
        resolve(false);
        return;
      }

      this.memory[key] = value;
      window.localStorage.setItem(this.localStorageKey, JSON.stringify(this.memory));

      resolve(true);
    });
  }
}
