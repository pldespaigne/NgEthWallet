import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ValidatorFn,
  ValidationErrors
} from '@angular/forms';

export const passwordMatchValidator: ValidatorFn = (
  control: FormGroup
): ValidationErrors | null => {
  const password = control.get('password');
  const confirmation = control.get('confirmation');

  return password && confirmation && password.value !== confirmation.value
    ? { passwordMatchError: true }
    : null;
};

@Component({
  selector: 'app-encryption',
  templateUrl: './encryption.component.html',
  styleUrls: ['./encryption.component.css']
})
export class EncryptionComponent implements OnInit {
  isLoading: boolean;

  encryptForm = new FormGroup(
    {
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ]),
      confirmation: new FormControl('', [Validators.required])
    },
    {
      validators: passwordMatchValidator
    }
  );

  @Output() encryptNsave = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  encryptAndSave() {
    this.isLoading = true;
    this.encryptNsave.emit(this.encryptForm.get('password').value);
  }
}
