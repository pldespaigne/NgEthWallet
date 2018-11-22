import { Component, OnInit } from '@angular/core';

import { WalletQuery, WalletService, WalletState } from '../../+state';
import { ethers } from 'ethers';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

  existingWallet: boolean;

  keystore: string;
  address: string;
  balance: string;
  // wallet: ethers.Wallet;
  provider: ethers.providers.BaseProvider;

  constructor(public service: WalletService, public query: WalletQuery) { }

  ngOnInit() {

    this.existingWallet = false;

    const walletObserver = {
      next: state => this.checkState(state),
      error: err => console.error('walletObserver got an error: ' + err),
      complete: () => console.log('walletObserver got a complete notification')
    };

    let ethWallet$ = this.query.select();
    ethWallet$.subscribe(walletObserver);

    // const blockNumObserver = {
    //   next: num => { console.log('block number : ', num);},
    //   error: err => console.error('blockNumObserver got an error: ' + err),
    //   complete: () => console.log('blockNumObserver got a complete notification')
    // }

    // this.walletService.blockNum$.subscribe(blockNumObserver);
  }

  checkState(state: WalletState) {
    if(state.keystore === '{}'){
      this.existingWallet = false;
      console.log('No Wallet !')
    } else {
      console.log(state.keystore);
      this.existingWallet = true;
      this.keystore = state.keystore;
      this.address = ethers.utils.getJsonWalletAddress(this.keystore);
      this.provider = ethers.getDefaultProvider('kovan');
      this.provider.getBalance(this.address).then(
        res => {
          this.balance = res.toString();
        }
      );
    }
  }

}
