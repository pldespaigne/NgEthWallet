import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-mnemonic',
  templateUrl: './mnemonic.component.html',
  styleUrls: ['./mnemonic.component.css']
})
export class MnemonicComponent implements OnInit {
  @Input() mnemonic: string[];
  @Output() reset = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}
}
