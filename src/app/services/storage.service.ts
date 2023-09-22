import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  // Store the value
  async store(storageKey: string, value: any) {
    const encryptedValue = btoa(encodeURIComponent(JSON.stringify(value)));
    await Preferences.set({
    key: storageKey,
    value: encryptedValue
    });
  }
  
  // Get the value
  async get(storageKey: string) {
    const ret = await Preferences.get({ key: storageKey });
    if (ret && ret.value) {
      return JSON.parse(decodeURIComponent(atob(ret.value)));
    } else {
      return null;
    }
  }  
  
  async removeStorageItem(storageKey: string) {
    await Preferences.remove({ key: storageKey });
  }
  
  // Clear storage
  async clear() {
    await Preferences.clear();
  }
}
