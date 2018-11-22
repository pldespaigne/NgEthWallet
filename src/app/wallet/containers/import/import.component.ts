import { Component, OnInit } from '@angular/core';

import { ethers } from 'ethers';
import { WalletService } from '../../+state';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent implements OnInit {

  isJSONWallet: boolean;
  isLoadDisabled: boolean;
  import: string;

  constructor(private service: WalletService) { }

  ngOnInit() {
    this.isJSONWallet = true;
    this.isLoadDisabled = true;
  }

  checkValue(value: string){
    if(this.isJSONWallet){
      const address = ethers.utils.getJsonWalletAddress(value);
      if(address !== null) {
        this.isLoadDisabled = false;
        this.import = value;
      } else this.isLoadDisabled = true;
    } else {
      const mnemo = value.split(' ');
      if(mnemo.length == 12) {
        this.isLoadDisabled = false;
        this.import = value;
      } else this.isLoadDisabled = true;
    }
  }

  importWallet(){
    if(this.isJSONWallet){
      // console.log('setting keystore');
      this.service.setKeystore(this.import);
    // } else {
      // this.service.setMnemonic(value);
      // console.log('wip');
    }
  }

  encryptAndSave(password: string) {
    // console.log('encrypt and save', this.import, password);
    this.service.createEncryptedWalletFromMnemonic(this.import, password);
  }

}
