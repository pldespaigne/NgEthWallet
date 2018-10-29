import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { EthWallet, createEthWallet } from './wallet.model';

export interface WalletState {
  wallet: EthWallet;
}

export function createInitialState(): WalletState {
  return {
    wallet: createEthWallet({})
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'wallet' })
export class WalletStore extends Store<WalletState> {

  constructor() {
    super(createInitialState());
  }

}

