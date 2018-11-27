import { Component, OnInit } from '@angular/core';

import { WalletService, WalletQuery } from '../../+state';
import { Observable, generate, BehaviorSubject } from 'rxjs';
import { StepperSelectionEvent } from '@angular/cdk/stepper';

// logical steps
const STEP_GENERATION = 1;
const STEP_VERIFICATION = 2;
const STEP_VERIFICATION_SUCCESS = 3;
const STEP_ENCRYPTION = 4;

// visual (template) stepper steps
const INDEX_GENERATION = 0;
const INDEX_VERIFICATION = 1;
const INDEX_ENCRYPTION = 2;

@Component({
  selector: 'app-generation',
  templateUrl: './generation.component.html',
  styleUrls: ['./generation.component.css']
})
export class GenerationComponent implements OnInit {
  mnemonic$: Observable<string[]>;
  steps$ = new BehaviorSubject(0);

  constructor(private service: WalletService, private query: WalletQuery) {}

  ngOnInit() {
    this.mnemonic$ = this.query.mnemonic$;
    this.service.randomMnemonic();

    this.steps$.next(STEP_GENERATION);
  }

  encryptAndSave(password: string) {
    this.service.createEncryptedWallet(password);
  }

  goToStep(step: number) {
    if (step === STEP_GENERATION) this.service.randomMnemonic();
    this.steps$.next(step);
  }

  goToIndex(select: StepperSelectionEvent) {
    switch (select.selectedIndex) {
      case INDEX_GENERATION:
        this.steps$.next(STEP_GENERATION);
        this.service.randomMnemonic();
        break;
      case INDEX_VERIFICATION:
        this.steps$.next(STEP_VERIFICATION);
        if (select.previouslySelectedIndex === INDEX_ENCRYPTION) {
          this.steps$.next(STEP_VERIFICATION_SUCCESS);
        }
        break;
      case INDEX_ENCRYPTION:
        this.steps$.next(STEP_ENCRYPTION);
        break;
    }
  }
}
