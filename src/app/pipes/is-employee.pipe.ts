import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from '../interfaces/Contact';

@Pipe({
  name: 'isEmployee'
})
export class IsEmployeePipe implements PipeTransform {

  transform(contacts:Contact[], isEmployee:boolean): Contact[] {
    let employeeArr = new Set()
    let customerArr = new Set()

    contacts.forEach((contact)=>{
      if(contact.employee) employeeArr.add(contact)
      else customerArr.add(contact)
    })
    
    let x =  isEmployee ? employeeArr : customerArr
    return  Array.from(x) as Contact[]
  }

}
