import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms"

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

export function asyncUrlValidator(control: AbstractControl): Promise<ValidationErrors | null> | null | {[key: string]:any} {
    const urlRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-.][a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
    const value = control.value
    
    return new Promise((resolve) => {setTimeout(() => urlRegex.test(value) ? resolve(null) : resolve({urlFormat: {value}}), 2000)})
}


