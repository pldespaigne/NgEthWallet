import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { WalletStore, WalletState } from './wallet.store';
import { ethers } from 'ethers';

@Injectable({ providedIn: 'root' })
export class WalletQuery extends Query<WalletState> {
  constructor(protected store: WalletStore) {
    super(store);
  }

  get mnemonic$() {
    return this.select(store => store.mnemonic);
  }

  get keystore$() {
    return this.select(store => store.keystore);
  }

  get isKeystoreValid$() {
    return this.select(store => ethers.utils.getJsonWalletAddress(store.keystore) === null ? false : true);
  }
}
