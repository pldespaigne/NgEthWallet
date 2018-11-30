import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SignDialogComponent } from '../../components/sign-dialog/sign-dialog.component';
import { ethers } from 'ethers';
import { WalletService } from '../../+state';
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

  constructor(public dialog: MatDialog, private service: WalletService) {}

  ngOnInit() {
    this.service.gasPrice().then(res => {
      console.log(res.toString());
      this.gasPrice = res;
    });
    this.service.txCount().then(res => {
      console.log(res);
      this.txCount = res;
    });
  }

  public async openSignDialog() {
    // const gasPrice = await this.service.gasPrice();
    const wei = ethers.utils.parseEther(this.value);

    const tx: ethers.utils.Transaction = {
      to: this.receiver,
      value: wei,
      nonce: this.txCount,
      gasLimit: new ethers.utils.BigNumber('21000'),
      gasPrice: this.gasPrice,
      data: '',
      chainId: 0
    };
    // console.log(tx);
    // this.service.sendEther(tx, 'azerty123'); // ! DO NOT SET THE PASSWORD LIKE THAT
    // console.log('open dialog');
    const dialogRef = this.dialog.open(SignDialogComponent, {data: tx});

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
