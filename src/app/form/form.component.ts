import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../user.class';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, AfterViewInit {
  roles: string[] = ['Guest', 'Moder', 'Admin']
  model: User = new User(1, '', '')

  formErrors: any = {
    name: '',
    age: ''
  }
  validationMessages: any = {
    name: {
      required: 'Name is required',
      minlength: 'Name must be at least 4 characters long'
    },
    age: {
      required: 'Age is required'
    }
  }

  @ViewChild('userForm') userForm: NgForm | null = null;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.userForm?.valueChanges?.subscribe(() => {
      this.onValueChanged()
    })
  }

  onValueChanged(data?: any): void {
    const form = this.userForm

    Object.keys(this.formErrors).forEach((field) => {
      this.formErrors[field] = ''
      
      const control = form?.controls[field]
      
      if(control && control.invalid && (control.dirty || control.touched)) {
        const message = this.validationMessages[field]

        if(control.errors) {
          Object.keys(control.errors).forEach((err) => {
            this.formErrors[field] +=  message[err] + ' '
          })
        }
      }
    })
  }

  onSubmit() {
  }
}
