import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ethers } from 'ethers';
import { WalletService } from '../../+state';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-dialog',
  templateUrl: './sign-dialog.component.html',
  styleUrls: ['./sign-dialog.component.css']
})
export class SignDialogComponent implements OnInit {
  password: string;
  isLoading: boolean;
  public signForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<SignDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ethers.utils.Transaction,
    private service: WalletService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isLoading = false;
    this.signForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  public get pwd() {
    return this.signForm.controls.password;
  }

  sendTx() {
    this.isLoading = true;
    this.service.sendEther(this.data['tx'], this.password).then(res => {
      console.log(res);
      this.dialogRef.close('success');
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
