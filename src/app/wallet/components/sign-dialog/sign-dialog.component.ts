import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ethers } from 'ethers';
import { WalletService } from '../../+state';

@Component({
  selector: 'app-sign-dialog',
  templateUrl: './sign-dialog.component.html',
  styleUrls: ['./sign-dialog.component.css']
})
export class SignDialogComponent implements OnInit {
  password: string;

  constructor(
    public dialogRef: MatDialogRef<SignDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: ethers.utils.Transaction,
    private service: WalletService
  ) {}

  ngOnInit() {}

  sendTx() {
    this.service.sendEther(this.data, this.password).then(res => {
      console.log(res);
      this.dialogRef.close('success');
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
