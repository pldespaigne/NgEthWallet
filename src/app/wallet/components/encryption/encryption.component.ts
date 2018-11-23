import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-encryption',
  templateUrl: './encryption.component.html',
  styleUrls: ['./encryption.component.css']
})
export class EncryptionComponent implements OnInit {
  // TODO factorise all those boolean into a behaviour
  disableConfirmation: boolean;
  disableEncrypt: boolean;
  disableSave: boolean;
  displayPassword: boolean;
  displayConfirmation: boolean;
  match: boolean;
  isLoading: boolean;

  password: string;

  @Output() encryptNsave = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {
    this.disableConfirmation = true;
    this.disableEncrypt = true;
    this.displayPassword = false;
    this.displayConfirmation = false;
    this.isLoading = false;
    this.match = false;
  }

  checkStrength() {
    if (this.password.length < 8) {
      this.disableConfirmation = true;
    } else {
      this.disableConfirmation = false;
    }
  }

  checkConfirmation(value: string) {
    if (value === this.password) {
      console.log('match !');
      this.disableEncrypt = false;
    } else {
      this.disableEncrypt = true;
    }
  }

  encryptAndSave() {
    this.isLoading = true;
    this.encryptNsave.emit(this.password);
  }
}
