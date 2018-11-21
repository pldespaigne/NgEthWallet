import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// import { ethers } from 'ethers';

@Component({
  selector: 'app-generation',
  templateUrl: './generation.component.html',
  styleUrls: ['./generation.component.css']
})
export class GenerationComponent implements OnInit {  // TODO rename this component in mnemonic component

  @Input() mnemonic: string[];
  @Output() generate = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
    // this.generate();
  }

}
