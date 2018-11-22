import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-sign-dialog',
  templateUrl: './sign-dialog.component.html',
  styleUrls: ['./sign-dialog.component.css']
})
export class SignDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SignDialogComponent>) { }

  ngOnInit() {
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }
}
