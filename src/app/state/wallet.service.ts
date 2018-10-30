import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';

import { WalletStore } from './wallet.store';

import { ethers } from 'ethers';

@Injectable({ providedIn: 'root' })
export class WalletService {

  ethProvider: ethers.providers.BaseProvider;
  blockNum$: Observable<number>;
  ethWallet: ethers.Wallet;

  constructor(private walletStore: WalletStore) {
    this.ethProvider = ethers.getDefaultProvider('kovan');
    this.blockNum$ = from(this.ethProvider.getBlockNumber());

    this.ethWallet = ethers.Wallet.createRandom();
    console.log(this.ethWallet);
  }
}
