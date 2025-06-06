import { Component } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent {

  isShowPass = false;

  handleShowPass () {
    this.isShowPass = !this.isShowPass;
  }

  public registerForm!: FormGroup;
  public formSubmitted = false;

  constructor() { }

  ngOnInit () {
    this.registerForm = new FormGroup({
      name:new FormControl(null,[Validators.required]),
      email:new FormControl(null,[Validators.required,Validators.email]),
      password:new FormControl(null,[Validators.required,Validators.minLength(6)]),
    })
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.registerForm.valid) {
      console.log('register-form-value', this.registerForm.value);
      // this.toastrService.success(`Message sent successfully`);

      // Reset the form
      this.registerForm.reset();
      this.formSubmitted = false; // Reset formSubmitted to false
    }
  }

  get name() { return this.registerForm.get('name') }
  get email() { return this.registerForm.get('email') }
  get password() { return this.registerForm.get('password') }
}
