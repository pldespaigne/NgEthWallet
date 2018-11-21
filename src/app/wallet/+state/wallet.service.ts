import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';

import { WalletStore } from './wallet.store';

import { ethers } from 'ethers';
import { WalletQuery } from './wallet.query';

@Injectable({ providedIn: 'root' })
export class WalletService {

  // ethProvider: ethers.providers.BaseProvider;
  // blockNum$: Observable<number>;
  // ethWallet: ethers.Wallet;

  constructor(private store: WalletStore, private query: WalletQuery) {
    // this.ethProvider = ethers.getDefaultProvider('kovan');
    // this.blockNum$ = from(this.ethProvider.getBlockNumber());

    // this.ethWallet = ethers.Wallet.createRandom();
    // console.log(this.ethWallet);
  }

  // refresh() {
  //   let keystore = localStorage.getItem('keystore');
  //   if(keystore) {
  //     this.walletStore.update(state => ({keystore: keystore}));
  //   }
  // }

  // store(keystore: string) {
  //   localStorage.setItem('keystore', keystore);
  //   this.refresh();
  // }

  setMnemonic(){
    const mnemoString = ethers.Wallet.createRandom().mnemonic;
    console.log(mnemoString);
    const mnemonic = mnemoString.split(' ');

    this.store.update(state => ({mnemonic}));
  }

  createEncryptedWallet(password: string){
    const mnemonic = this.query.getSnapshot().mnemonic;
    const wallet = ethers.Wallet.fromMnemonic(mnemonic.join(' '));
    const keystore = JSON.stringify(wallet.encrypt(password));

    this.store.update(state => ({keystore}));
  }
}
