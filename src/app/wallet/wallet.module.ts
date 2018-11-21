import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './containers/about/about.component';
import { MnemonicComponent } from './containers/mnemonic/mnemonic.component';
import { WalletComponent } from './containers/wallet/wallet.component';

import { MaterialModule } from '../material/material.module';
import { ImportComponent } from './containers/import/import.component';
import { GenerationComponent } from './components/generation/generation.component';
import { VerificationComponent } from './components/verification/verification.component';
import { EncryptionComponent } from './components/encryption/encryption.component';
import { FormsModule } from '@angular/forms';
// import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    // ReactiveFormsModule
  ],
  providers: [
    // {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
  ],
  declarations: [AboutComponent, MnemonicComponent, WalletComponent, ImportComponent, GenerationComponent, VerificationComponent, EncryptionComponent]
})
export class WalletModule { }
