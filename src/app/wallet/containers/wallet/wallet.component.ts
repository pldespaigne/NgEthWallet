import { Component, OnInit } from '@angular/core';

import { WalletQuery, WalletService, WalletState } from '../../+state';
import { ethers } from 'ethers';
import { Observable } from 'rxjs';
import { BigNumber, BigNumberish } from 'ethers/utils';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
  // existingWallet: boolean;

  // keystore: string;
  price: number;
  address: string;
  isKeystoreValid$: Observable<boolean>;
  keystore$: Observable<string>;
  balance: BigNumberish;
  provider: ethers.providers.BaseProvider;

  constructor(public service: WalletService, public query: WalletQuery) {}

  ngOnInit() {
    // this.existingWallet = false;

    // const walletObserver = {
    //   // ! TODO DO NOT DO THIS !!!!
    //   next: state => this.checkState(state),
    //   error: err => console.error('walletObserver got an error: ' + err),
    //   complete: () => console.log('walletObserver got a complete notification')
    // };

    // const ethWallet$ = this.query.select();
    // ethWallet$.subscribe(walletObserver);
    this.service.ethPrice().then(price => this.price = price);
    this.isKeystoreValid$ = this.query.isKeystoreValid$;
    this.keystore$ = this.query.keystore$;
    this.keystore$.subscribe(keystore => {
      this.address = ethers.utils.getJsonWalletAddress(keystore);
      if (this.address !== null) {
        this.provider = ethers.getDefaultProvider('kovan');
        this.provider.getBalance(this.address).then(res => {
          // console.log(res);
          this.balance = res;
        });
      } else {
        console.log('invalid keystore'); // TODO REMOVE DEBUG LOG
      }
    });
  }

  // checkState(state: WalletState) {
  //   if (state.keystore === '{}') {
  //     this.existingWallet = false;
  //     console.log('No Wallet !');
  //   } else {
  //     console.log(state.keystore);
  //     this.existingWallet = true;
  //     this.keystore = state.keystore;
  //     this.address = ethers.utils.getJsonWalletAddress(this.keystore);
  //     this.provider = ethers.getDefaultProvider('kovan');
  //     this.provider.getBalance(this.address).then(res => {
  //       this.balance = res.toString();
  //     });
  //   }
  // }
}
