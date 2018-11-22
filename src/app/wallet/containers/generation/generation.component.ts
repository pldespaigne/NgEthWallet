import { Component, OnInit } from '@angular/core';

import { WalletService, WalletQuery } from '../../+state';
import { Observable, generate } from 'rxjs';

// import {ethers} from 'ethers';

@Component({
  selector: 'app-generation',
  templateUrl: './generation.component.html',
  styleUrls: ['./generation.component.css']
})
export class GenerationComponent implements OnInit {

  // mnemonic: string[]
  mnemonic$: Observable<string[]>
  canBack: boolean;
  canNext: boolean;
  step: number;
  isVerified: boolean;

  constructor(private service: WalletService, private query: WalletQuery) { }

  ngOnInit() {
    this.mnemonic$ = this.query.mnemonic$;
    this.service.randomMnemonic();
    this.canBack = false;
    this.canNext = true;
    this.step = 0;
    this.isVerified = false;
  }

  onGenerate(){
    this.isVerified = false;
    this.service.randomMnemonic();
  }

  nextStep(){
    if(this.step < 2){
      this.step ++;
      this.canBack = true;
      if(this.step == 2) this.canNext = false;
    }
    // console.log('back :', this.canBack, ' next :', this.canNext, ' step :', this.step, ' verif :', this.isVerified);
  }

  backStep(){
    if(this.step > 0){
      this.step --;
      this.canNext = true;
      if(this.step == 0) this.canBack = false;
    }
    // console.log('back :', this.canBack, ' next :', this.canNext, ' step :', this.step, ' verif :', this.isVerified);
  }

  setVerified(verified: boolean) {
    // console.log('event', verified);
    this.isVerified = verified;
  }

  encryptAndSave(password: string) {
    // console.log('encrypt and save', password);
    this.service.createEncryptedWallet(password);
  }

}
