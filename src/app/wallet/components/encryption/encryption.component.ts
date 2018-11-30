import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn, ValidationErrors, FormBuilder } from '@angular/forms';

export const passwordMatchValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const password = control.get('password');
  const confirmation = control.get('confirmation');

  return password && confirmation && password.value !== confirmation.value ? { passwordMatchError: true } : null;
};

@Component({
  selector: 'app-encryption',
  templateUrl: './encryption.component.html',
  styleUrls: ['./encryption.component.css']
})
export class EncryptionComponent implements OnInit {
  public isLoading: boolean;

  public encryptForm: FormGroup;

  @Output() encrypt = new EventEmitter<string>();

  constructor(private fb: FormBuilder) {}

  public get pwd() {
    return this.encryptForm.controls.password;
  }

  public get confirm() {
    return this.encryptForm.controls.confirmation;
  }

  ngOnInit() {
    this.encryptForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmation: ['', [Validators.required]]
    },
    {
      validator: passwordMatchValidator
    });
  }

  public encryptAndSave() {
    this.isLoading = true;
    this.encrypt.emit(this.encryptForm.get('password').value);
  }
}
