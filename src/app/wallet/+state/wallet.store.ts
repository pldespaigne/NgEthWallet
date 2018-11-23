import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface WalletState {
  keystore: string;
  mnemonic: string[];
}

export function createInitialState(): WalletState {
  return {
    keystore: localStorage.getItem('keystore') || '{}',
    mnemonic: null
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'wallet' })
export class WalletStore extends Store<WalletState> {
  constructor() {
    super(createInitialState());
  }
}
