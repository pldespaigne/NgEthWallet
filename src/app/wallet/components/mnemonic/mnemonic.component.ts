import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// import { ethers } from 'ethers';

@Component({
  selector: 'app-mnemonic',
  templateUrl: './mnemonic.component.html',
  styleUrls: ['./mnemonic.component.css']
})
export class MnemonicComponent implements OnInit {

  @Input() mnemonic: string[];
  @Output() generate = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
    // this.generate();
  }

}
