import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { EthWallet } from '../../../state/wallet.model';
import { WalletService } from '../../../state/wallet.service';
import { WalletQuery } from '../../../state/wallet.query';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

  ethWallet: Observable<EthWallet>;

  constructor(public walletService: WalletService, public walletQuery: WalletQuery) { }

  ngOnInit() {
    this.ethWallet = this.walletQuery.select();
  }

}
