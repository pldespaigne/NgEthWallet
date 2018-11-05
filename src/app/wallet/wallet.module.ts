import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './containers/about/about.component';
import { MnemonicComponent } from './containers/mnemonic/mnemonic.component';
import { VerificationComponent } from './containers/verification/verification.component';
import { WalletComponent } from './containers/wallet/wallet.component';
import { TransactionComponent } from './containers/transaction/transaction.component';

import { MaterialModule } from '../material/material.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [AboutComponent, MnemonicComponent, VerificationComponent, WalletComponent, TransactionComponent]
})
export class WalletModule { }
