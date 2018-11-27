import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
  AbstractControl
} from '@angular/forms';

export function wordMismatchValidator(answer: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const mismatch = answer !== control.value;
    return mismatch ? { wordMismatch: true } : null;
  };
}

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {
  verif: Object[];

  verifForm: FormGroup;

  @Input()
  set mnemonic(mnemo: string[]) {
    this.verif = [];
    const random = Array(mnemo.length)
      .fill(0)
      .map((_, i) => i);
    for (let i = 0; i < 3; i++) {
      const [r] = random.splice(Math.floor(Math.random() * random.length), 1);
      this.verif.push({ i: r, word: mnemo[r], ok: false });
    }
    this.verif = this.verif.sort((a, b) => a['i'] - b['i']);
    this.verifForm = new FormGroup({
      word0: new FormControl('', [
        Validators.required,
        wordMismatchValidator(this.verif[0]['word'])
      ]),
      word1: new FormControl('', [
        Validators.required,
        wordMismatchValidator(this.verif[1]['word'])
      ]),
      word2: new FormControl('', [
        Validators.required,
        wordMismatchValidator(this.verif[2]['word'])
      ])
    });
  }

  @Output() valid = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}

  checkWord(value: string, i: number) {
    if (this.verif[i]['word'] === value) this.verif[i]['ok'] = true;
    else this.verif[i]['ok'] = false;

    this.checkVerification();
  }

  checkVerification() {
    for (const v of this.verif) {
      if (!v['ok']) {
        return;
      }
    }

    this.valid.emit();
  }
}
