import { Component, OnInit, Output, EventEmitter} from '@angular/core';

import saveAs from 'file-saver';


@Component({
  selector: 'app-encryption',
  templateUrl: './encryption.component.html',
  styleUrls: ['./encryption.component.css']
})
export class EncryptionComponent implements OnInit {

  password: string;
  // passwordConfirm: string;
  disableConfirmation: boolean;
  disableEncrypt: boolean;
  disableSave: boolean;
  displayPassword: boolean;
  displayConfirmation: boolean;
  match: boolean;
  walletUrl: string;

  @Output() encryptNsave = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
    this.disableConfirmation = true;
    this.disableEncrypt = true;
    this.displayPassword = false;
    this.displayConfirmation = false;
    this.match = false;
  }

  checkStrength(){
    if(this.password.length < 8) {
      this.disableConfirmation = true;
    }else {
      this.disableConfirmation = false;
    }
  }

  checkConfirmation(value: string){
    if(value == this.password){
      console.log('match !');
      this.disableEncrypt = false;
    } else {
      this.disableEncrypt = true;
    }
  }

  encryptAndSave() {
    this.encryptNsave.emit(this.password);
    // const blob = new Blob(['{"text":"it works !"}'], { type: 'text/json;charset=utf-8' });
    // saveAs(blob, "wallet.json");
  }

}
