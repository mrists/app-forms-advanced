import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ageValidator, emailValidator } from '../custom-validators';
import { FORM_ERRORS, VALIDATION_MESSAGES } from '../form-data';
import { User } from '../user.class';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  validationMessages: any = VALIDATION_MESSAGES
  formErrors: any = FORM_ERRORS
  
  roles: string[] = ['Guest', 'Moder', 'Admin']
  private user: User = new User(null, null, null, null, null, null)
  
  userForm!: FormGroup

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm()
  }

  private buildForm(): void {
    this.userForm = this.formBuilder.group({
      name: [this.user.name, [Validators.required, Validators.maxLength(10), Validators.minLength(4)]],
      password: [this.user.password, [Validators.required, Validators.minLength(7)]],
      email: [this.user.email, [Validators.required, emailValidator]],
      age: [this.user.age, [Validators.required, ageValidator(1 , 122)]],
      role: [this.user.role, Validators.required]
    })

    this.userForm.valueChanges.subscribe(() => {
      this.onValueChanged()
    })
  }

  onSubmit() {
    console.log('Form submited')
  }

  onValueChanged(data?: any): void {
    const form = this.userForm

    Object.keys(this.formErrors).forEach((field) => {
      this.formErrors[field] = ''
      
      const control = form?.controls[field]
      
      if(control && control.invalid && (control.dirty || control.touched) && control.errors) {
        const message = this.validationMessages[field]

        Object.keys(control.errors).some(err => this.formErrors[field] =  message[err])
      }
    })
  }
}
