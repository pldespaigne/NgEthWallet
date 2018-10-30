import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface WalletState {
  address: string;
  keystore: string;
  balance: number;
}

export function createInitialState(): WalletState {
  return {
    address: 'test_address',
    keystore: 'empty_keystore',
    balance: 0
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'wallet' })
export class WalletStore extends Store<WalletState> {

  constructor() {
    super(createInitialState());
  }

}

