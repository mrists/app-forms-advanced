import { AbstractControl, ValidatorFn } from "@angular/forms"

export function emailValidator(control: AbstractControl): { [key: string]: any} | null {
    const emailRegex = /^([a-zA-Z0-9_.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,6})$/
    const value = control.value
    
    return emailRegex.test(value) ? null : {emailValidator: {value}}
}

export function ageValidator(min: number, max: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any} | null => {
        const value = +control.value

        if(!(isNaN(value)) && (value >= min) && (value <= max)) return null
        
        return {ageValidator: {value}}
    }
}
