import { AbstractControl } from "@angular/forms"

export function emailValidator(control: AbstractControl): { [key: string]: any} | null {
    const emailRegex = /^([a-zA-Z0-9_.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,6})$/
    const value = control.value
    
    return emailRegex.test(value) ? null : {emailValidator: {value}}
}