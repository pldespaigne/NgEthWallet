import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { ethers } from 'ethers'

export interface WalletState {
  keystore: string;
  wallet: ethers.Wallet;
}

export function createInitialState(): WalletState {
  return {
    keystore: localStorage.getItem('keystore') || '{}',
    wallet: null
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'wallet' })
export class WalletStore extends Store<WalletState> {

  constructor() {
    super(createInitialState());
  }

  updateWallet(wallet: ethers.Wallet) {
    this.update(state => ({wallet: wallet}));
  }
}

