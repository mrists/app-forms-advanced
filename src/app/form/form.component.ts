import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailValidator } from '../custom-validators';
import { User } from '../user.class';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
 
   roles: string[] = ['Guest', 'Moder', 'Admin']
   user: User = new User(null, null, null, null, null, null)

  userForm!: FormGroup

  formErrors: any = {
      name: '',
      password: '',
      email: '',
      age: '',
      role: ''
  }
  validationMessages: any = {
    name: {
      required: 'Name is required',
      minlength: 'Name must be at least 4 characters long',
      maxlength: "Max name's long is 10 characters",
    },
    password: {
      required: 'Password is required',
      minlength: 'Password must be at least 7 characters long'
    },
    email: {
      required: 'Email is required',
      emailValidator: 'Email has invalid format'
    },
    age: {
      required: 'Age is required',
      pattern: 'Age must be a number'
    },
    role: {
      required: 'Role is required'
    }
  }

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm()
  }

  private buildForm(): void {
    this.userForm = this.formBuilder.group({
      name: [this.user.name, [Validators.required, Validators.maxLength(10), Validators.minLength(4)]],
      password: [this.user.password, [Validators.required, Validators.minLength(7)]],
      email: [this.user.email, [Validators.required, emailValidator]],
      age: [this.user.age, [Validators.required, Validators.pattern(/^\d+/)]],
      role: [this.user.role, Validators.required]
    })

    this.userForm.valueChanges.subscribe(() => {
      this.onValueChanged()
    })
  }

  onSubmit() {
  }

  onValueChanged(data?: any): void {
    const form = this.userForm

    Object.keys(this.formErrors).forEach((field) => {
      this.formErrors[field] = ''
      
      const control = form?.controls[field]
      
      if(control && control.invalid && (control.dirty || control.touched)) {
        const message = this.validationMessages[field]

        if(control.errors) {
          Object.keys(control.errors).forEach((err) => this.formErrors[field] +=  message[err] + ' ')
        }
      }
    })
  }
}
// export class FormComponent implements OnInit, AfterViewInit {
//   roles: string[] = ['Guest', 'Moder', 'Admin']
//   model: User = new User(1, '', '')

//   formErrors: any = {
//     name: '',
//     age: ''
//   }
//   validationMessages: any = {
//     name: {
//       required: 'Name is required',
//       minlength: 'Name must be at least 4 characters long'
//     },
//     age: {
//       required: 'Age is required'
//     }
//   }

//   @ViewChild('userForm') userForm: NgForm | null = null;

//   constructor() { }

//   ngOnInit(): void {
//   }

//   ngAfterViewInit(): void {
//     this.userForm?.valueChanges?.subscribe(() => {
//       this.onValueChanged()
//     })
//   }

//   onValueChanged(data?: any): void {
//     const form = this.userForm

//     Object.keys(this.formErrors).forEach((field) => {
//       this.formErrors[field] = ''
      
//       const control = form?.controls[field]
      
//       if(control && control.invalid && (control.dirty || control.touched)) {
//         const message = this.validationMessages[field]

//         if(control.errors) {
//           Object.keys(control.errors).forEach((err) => {
//             this.formErrors[field] +=  message[err] + ' '
//           })
//         }
//       }
//     })
//   }

//   onSubmit() {
//   }
// }
