import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './wallet/containers/about/about.component';
import { MnemonicComponent } from './wallet/containers/mnemonic/mnemonic.component';
import { TransactionComponent } from './wallet/containers/transaction/transaction.component';
import { VerificationComponent } from './wallet/containers/verification/verification.component';
import { WalletComponent } from './wallet/containers/wallet/wallet.component';

const routes: Routes = [
  { path: 'wallet/about', component: AboutComponent },
  { path: 'wallet/mnemonic', component: MnemonicComponent },
  { path: 'wallet/transaction', component: TransactionComponent },
  { path: 'wallet/verify', component: VerificationComponent },
  { path: 'wallet', component: WalletComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
