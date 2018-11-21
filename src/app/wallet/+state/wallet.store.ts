import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { ethers } from 'ethers'

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

  // updateWallet(wallet: ethers.Wallet) {
  //   this.update(state => ({wallet: wallet}));
  // }
}

