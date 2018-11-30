import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './containers/about/about.component';
import { GenerationComponent } from './containers/generation/generation.component';
import { WalletComponent } from './containers/wallet/wallet.component';

import { MaterialModule } from '../material/material.module';
import { ImportComponent } from './containers/import/import.component';
import { MnemonicComponent } from './components/mnemonic/mnemonic.component';
import { VerificationComponent } from './components/verification/verification.component';
import { EncryptionComponent } from './components/encryption/encryption.component';
import { FormsModule } from '@angular/forms';
import { SignDialogComponent } from './components/sign-dialog/sign-dialog.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { ReactiveFormsModule } from '@angular/forms';
import { WalletRoutingModule } from './wallet-routing.module';
import { EtherPipe, WeiPipe, EtherToUsd } from '../utils/ether.pipe';

@NgModule({
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule, WalletRoutingModule],
  declarations: [
    AboutComponent,
    MnemonicComponent,
    WalletComponent,
    ImportComponent,
    GenerationComponent,
    VerificationComponent,
    EncryptionComponent,
    SignDialogComponent,
    TransactionComponent,
    EtherPipe,
    WeiPipe,
    EtherToUsd
  ],
  entryComponents: [SignDialogComponent]
})
export class WalletModule {}
