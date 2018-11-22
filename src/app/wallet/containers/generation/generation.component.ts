import { Component, OnInit } from '@angular/core';

import { WalletService, WalletQuery } from '../../+state';
import { Observable, generate } from 'rxjs';

@Component({
  selector: 'app-generation',
  templateUrl: './generation.component.html',
  styleUrls: ['./generation.component.css']
})
export class GenerationComponent implements OnInit {

  // TODO factorise all those boolean into a behaviour
  canBack: boolean;
  canNext: boolean;
  isVerified: boolean;
  step: number;

  mnemonic$: Observable<string[]>
  
  

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
  }

  backStep(){
    if(this.step > 0){
      this.step --;
      this.canNext = true;
      if(this.step == 0) this.canBack = false;
    }
  }

  setVerified(verified: boolean) {
    this.isVerified = verified;
  }

  encryptAndSave(password: string) {
    this.service.createEncryptedWallet(password);
  }

}
