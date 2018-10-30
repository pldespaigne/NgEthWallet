import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

// import { EthWallet } from '../../../state/wallet.model';
import { WalletService } from '../../../state/wallet.service';
import { WalletQuery } from '../../../state/wallet.query';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

  address: string;
  keystore: string;
  balance: number;

  constructor(public walletService: WalletService, public walletQuery: WalletQuery) { }

  ngOnInit() {
    const walletObserver = {
      next: wallet => {
        console.log('Wallet update' , wallet);
        this.address = wallet.address;
        this.keystore = wallet.keystore;
        this.balance = wallet.balance;
      },
      error: err => console.error('Observer got an error: ' + err),
      complete: () => console.log('Observer got a complete notification'),
    };

    let ethWallet = this.walletQuery.select();
    ethWallet.subscribe(walletObserver);
  }

}
