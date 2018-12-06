import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

import { SignDialogComponent } from '../../components/sign-dialog/sign-dialog.component';
import { ethers } from 'ethers';
import { WalletService } from '../../+state';


export function etherValueValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    try {
      ethers.utils.parseEther(control.value);
      return null;
    } catch (err) {
      return {'etherValueError': {value: err}};
    }
  };
}

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  receiver: string;
  value: string;
  gasPrice: ethers.utils.BigNumber;
  txCount: number;
  public sendForm: FormGroup;

  @Input() price: number;

  constructor(public dialog: MatDialog, private service: WalletService, private fb: FormBuilder) {}

  ngOnInit() {
    this.service.gasPrice().then(res => {
      console.log(res.toString());
      this.gasPrice = res;
    });
    this.service.txCount().then(res => {
      console.log(res);
      this.txCount = res;
    });
    this.sendForm = this.fb.group({
      receiver: ['', [Validators.required, Validators.minLength(42), Validators.maxLength(42)]],
      value: ['', [Validators.required, etherValueValidator()]],
    });
  }

  public get receiv() {
    return this.sendForm.controls.receiver;
  }

  public get val() {
    return this.sendForm.controls.value;
  }

  public async openSignDialog() {
    const wei = ethers.utils.parseEther(this.value);

    const tx: ethers.utils.Transaction = {
      to: this.receiver,
      value: wei,
      nonce: this.txCount,
      gasLimit: new ethers.utils.BigNumber('21000'),
      gasPrice: this.gasPrice,
      data: '',
      chainId: ethers.utils.getNetwork('kovan').chainId // TODO GET NETWORK FROM STORE
    };
    const dialogRef = this.dialog.open(SignDialogComponent, {data: {tx: tx, price: this.price}});

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
