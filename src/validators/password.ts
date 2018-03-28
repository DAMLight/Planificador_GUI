import {FormGroup} from '@angular/forms';
 
export class PasswordValidator {
 
  static isMatching(group: FormGroup){

    console.log("password check");
    
    var firstPassword = group.controls['password'].value;
    var secondPassword = group.controls['passwordConfirmation'].value;
    if((firstPassword && secondPassword) && (firstPassword != secondPassword)){
      console.log("mismatch");
      group.controls['passwordConfirmation'].setErrors({'nocon': true});
      return { 'nocon': true };      
    } else{
      return null;
    }
    
  }
 
}