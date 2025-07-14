import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfigStore {
  private _isInstalled: BehaviorSubject<boolean | null> = new BehaviorSubject<
    boolean | null
  >(null);
  private _name: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);
  private _description: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);

  get isInstalled(): boolean | null {
    return this._isInstalled.getValue();
  }

  set isInstalled(val: boolean) {
    this._isInstalled.next(val);
  }

  get isInstalled$() {
    return this._isInstalled.asObservable();
  }


  get name(): string | null {
    return this._name.getValue();
  }

  set name(val: string) {
    this._name.next(val);
  }

  get name$() {
    return this._name.asObservable();
  }
  get description(): string | null {
    return this._description.getValue();
  }
  set description(val: string) {
    this._description.next(val);
  }
  get description$() {
    return this._description.asObservable();
  }
}
