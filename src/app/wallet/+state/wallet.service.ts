import { Injectable } from '@angular/core';

import { WalletStore } from './wallet.store';

import { ethers } from 'ethers';
import { WalletQuery } from './wallet.query';

@Injectable({ providedIn: 'root' })
export class WalletService {
  constructor(private store: WalletStore, private query: WalletQuery) {}

  randomMnemonic() {
    const mnemoString = ethers.Wallet.createRandom().mnemonic;
    console.log(mnemoString);
    const mnemonic = mnemoString.split(' ');

    this.store.update(state => ({ mnemonic }));
  }

  setMnemonic(mnemo: string) {
    const mnemonic = mnemo.split(' ');
    this.store.update(state => ({ mnemonic }));
  }

  setKeystore(keystore: string) {
    this.store.update(state => ({ keystore }));
  }

  createEncryptedWallet(password: string) {
    const mnemonic = this.query.getSnapshot().mnemonic;
    const wallet = ethers.Wallet.fromMnemonic(mnemonic.join(' '));
    wallet.encrypt(password).then(keystore => {
      this.store.update(state => ({ keystore }));
    });
  }

  createEncryptedWalletFromMnemonic(mnemonic: string, password: string) {
    const wallet = ethers.Wallet.fromMnemonic(mnemonic);
    this.setMnemonic(mnemonic);
    wallet.encrypt(password).then(keystore => {
      this.store.update(state => ({ keystore }));
    });
  }
}
