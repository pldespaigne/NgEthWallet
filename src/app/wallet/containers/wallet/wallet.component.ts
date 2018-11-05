import { Component, OnInit } from '@angular/core';

import { WalletState } from '../../../state/wallet.store';
import { WalletService } from '../../../state/wallet.service';
import { WalletQuery } from '../../../state/wallet.query';
import { ethers } from 'ethers';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

  existingWallet: boolean;

  keystore: string;
  wallet: ethers.Wallet;

  constructor(public walletService: WalletService, public walletQuery: WalletQuery) { }

  ngOnInit() {

    this.existingWallet = false;

    const walletObserver = {
      next: walletState => this.checkState(walletState),
      error: err => console.error('walletObserver got an error: ' + err),
      complete: () => console.log('walletObserver got a complete notification')
    };

    let ethWallet$ = this.walletQuery.select();
    ethWallet$.subscribe(walletObserver);

    const blockNumObserver = {
      next: num => { console.log('block number : ', num);},
      error: err => console.error('blockNumObserver got an error: ' + err),
      complete: () => console.log('blockNumObserver got a complete notification')
    }

    this.walletService.blockNum$.subscribe(blockNumObserver);
  }

  checkState(walletState: WalletState) {
    if(walletState.keystore === '{}'){
      this.existingWallet = false;
      console.log('No Wallet !')
    } else {
      this.existingWallet = true;
    }
  }

}
